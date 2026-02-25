import { useState } from "react";

import { ForgotPasswordForm, ForgotPasswordSuccess } from "@/features/auth/ui";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

import { routes } from "@/app/config/routes";
import { t } from "@/shared/lib/i18n";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    const isSuccess = !!email;

    return (
        <AuthCard
            title={
                isSuccess
                    ? t("auth.forgotPassword.state.success.title")
                    : t("auth.forgotPassword.state.default.title")
            }
            description={
                isSuccess
                    ? t("auth.forgotPassword.state.success.description")
                    : t("auth.forgotPassword.state.default.description")
            }
            footer={
                isSuccess ? (
                    <AuthRedirect
                        question={t(
                            "auth.forgotPassword.redirect.success.question",
                        )}
                        linkText={t(
                            "auth.forgotPassword.redirect.success.linkText",
                        )}
                        to={routes.login()}
                    />
                ) : (
                    <AuthRedirect
                        question={t(
                            "auth.forgotPassword.redirect.default.question",
                        )}
                        linkText={t(
                            "auth.forgotPassword.redirect.default.linkText",
                        )}
                        to={routes.login()}
                    />
                )
            }
        >
            {isSuccess ? (
                <ForgotPasswordSuccess email={email} />
            ) : (
                <ForgotPasswordForm onSuccess={setEmail} />
            )}
        </AuthCard>
    );
};
