import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useConfirmEmailMutation } from "../../model/hooks/useConfirmEmailMutation";
import { routes } from "@/app/config/routes";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
    Spinner,
} from "@/shared/ui";
import { normalizeApiError } from "@/shared/api/http/errror";

const deleteSearchParams = (param: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, "", url.toString());
};

type Status =
    | "pending"
    | "success"
    | "invalid-token"
    | "expired-token"
    | "error";

export type ConfirmEmailProps = {
    token: string;
};

export const ConfirmEmail = ({ token }: ConfirmEmailProps) => {
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
                deleteSearchParams("token");

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
        if (isPending) return "Confirming your email…";
        if (isSuccess) return "Email confirmed!";
        if (isExpired) return "Link expired";
        if (isInvalid) return "Invalid link";
        return "Confirmation failed";
    }, [isPending, isSuccess, isExpired, isInvalid]);

    const description = useMemo(() => {
        if (isPending) return "Please wait a moment.";
        if (isSuccess)
            return "Your email has been verified. You can now sign in.";
        if (isExpired)
            return "This link has expired. Request a new verification email from Login.";
        if (isInvalid)
            return "This link is not valid. Open the link from your email again.";
        return "Something went wrong. Please try again later.";
    }, [isPending, isSuccess, isExpired, isInvalid]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-1 justify-center items-center">
                {isPending && <Spinner />}

                {isSuccess && (
                    <Link to={routes.login()}>
                        <Button>Back to login</Button>
                    </Link>
                )}

                {isFailed && (
                    <Link to={routes.signup()}>
                        <Button>Go to signup</Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
};
