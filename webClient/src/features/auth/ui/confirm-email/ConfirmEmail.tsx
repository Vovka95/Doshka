import { useEffect, useMemo, useRef, useState } from "react";

import { AuthCard, AuthRedirect } from "@/widgets/auth";
import { Spinner } from "@/shared/ui";

import { useConfirmEmailMutation } from "../../model/hooks";

import { normalizeApiError } from "@/shared/api/http/errror";
import { routes } from "@/app/config/routes";
import { t } from "@/shared/lib/i18n";

type Status =
    | "pending"
    | "success"
    | "invalid-token"
    | "expired-token"
    | "error";

export type ConfirmEmailProps = {
    onSuccess: () => void;
    token: string;
};

export const ConfirmEmail = ({ token, onSuccess }: ConfirmEmailProps) => {
    const confirmEmailMutation = useConfirmEmailMutation();
    const [status, setStatus] = useState<Status>("pending");

    const startedRef = useRef(false);

    const isPending = status === "pending";
    const isSuccess = status === "success";
    const isInvalid = status === "invalid-token";
    const isExpired = status === "expired-token";
    const isFailed =
        isExpired ||
        isInvalid ||
        status === "error" ||
        (!isSuccess && !isPending);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        (async () => {
            try {
                await confirmEmailMutation.mutateAsync(token);

                onSuccess();

                setStatus("success");
            } catch (error) {
                const apiError = normalizeApiError(error);

                if (apiError.code === "AUTH_INVALID_TOKEN") {
                    setStatus("invalid-token");
                    return;
                }

                if (apiError.code === "AUTH_TOKEN_EXPIRED") {
                    setStatus("expired-token");
                    return;
                }

                setStatus("error");
            }
        })();
    }, [token]);

    const title = useMemo(() => {
        if (isPending) return t("auth.confirmEmail.state.pending.title");
        if (isSuccess) return t("auth.confirmEmail.state.success.title");
        if (isExpired) return t("auth.confirmEmail.state.expired.title");
        if (isInvalid) return t("auth.confirmEmail.state.invalid.title");
        return t("auth.confirmEmail.state.default.title");
    }, [isPending, isSuccess, isExpired, isInvalid]);

    const description = useMemo(() => {
        if (isPending) return t("auth.confirmEmail.state.pending.description");
        if (isSuccess) return t("auth.confirmEmail.state.success.description");
        if (isExpired) return t("auth.confirmEmail.state.expired.description");
        if (isInvalid) return t("auth.confirmEmail.state.invalid.description");
        return t("auth.confirmEmail.state.default.description");
    }, [isPending, isSuccess, isExpired, isInvalid]);

    return (
        <AuthCard
            title={title}
            description={description}
            footer={
                <div className="grid items-center justify-center">
                    {isPending && <Spinner />}

                    {isSuccess && (
                        <AuthRedirect
                            to={routes.login()}
                            linkText={t(
                                "auth.confirmEmail.redirect.success.linkText",
                            )}
                            isButton
                        />
                    )}

                    {isFailed && (
                        <AuthRedirect
                            to={routes.signup()}
                            linkText={t(
                                "auth.confirmEmail.redirect.error.linkText",
                            )}
                            isButton
                        />
                    )}
                </div>
            }
        />
    );
};
