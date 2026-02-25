import { useState } from "react";

import { SignupForm, SignupSuccess } from "@/features/auth/ui";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

import { routes } from "@/app/config/routes";
import { t } from "@/shared/lib/i18n";

export const SignupPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    const isSuccess = !!email;

    return (
        <AuthCard
            title={
                isSuccess
                    ? t("auth.signup.state.success.title")
                    : t("auth.signup.state.default.title")
            }
            description={
                isSuccess
                    ? t("auth.signup.state.success.description")
                    : t("auth.signup.state.default.description")
            }
            footer={
                isSuccess ? (
                    <AuthRedirect
                        question={t("auth.signup.redirect.success.question")}
                        linkText={t("auth.signup.redirect.success.linkText")}
                        to={routes.login()}
                    />
                ) : (
                    <AuthRedirect
                        question={t("auth.signup.redirect.default.question")}
                        linkText={t("auth.signup.redirect.default.linkText")}
                        to={routes.login()}
                    />
                )
            }
        >
            {isSuccess ? (
                <SignupSuccess email={email} />
            ) : (
                <SignupForm onSuccess={setEmail} />
            )}
        </AuthCard>
    );
};
