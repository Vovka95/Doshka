import { routes } from "@/app/config/routes";

import { LoginForm } from "@/features/auth/ui";
import { t } from "@/shared/lib/i18n";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

export const LoginPage = () => {
    return (
        <AuthCard
            title={t("auth.login.state.default.title")}
            description={t("auth.login.state.default.title")}
            footer={
                <>
                    <AuthRedirect
                        question={t(
                            "auth.login.redirect.forgotPassword.question",
                        )}
                        linkText={t(
                            "auth.login.redirect.forgotPassword.linkText",
                        )}
                        to={routes.forgotPassword()}
                    />

                    <AuthRedirect
                        question={t("auth.login.redirect.signup.question")}
                        linkText={t("auth.login.redirect.signup.linkText")}
                        to={routes.signup()}
                    />
                </>
            }
        >
            <LoginForm />
        </AuthCard>
    );
};
