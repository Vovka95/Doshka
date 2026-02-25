import { routes } from "@/app/config/routes";
import { ResetPasswordForm } from "@/features/auth/ui";
import {
    useReadURLSearchParam,
    useRemoveURLSearchParam,
} from "@/shared/lib/hooks";
import { t } from "@/shared/lib/i18n";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

const RESET_PASSWOD_PAGE_SEARCH_PARAM = "token";

export const ResetPasswordPage = () => {
    const token = useReadURLSearchParam(RESET_PASSWOD_PAGE_SEARCH_PARAM);
    const removeSearchParam = useRemoveURLSearchParam();

    const onSuccess = () => {
        removeSearchParam(RESET_PASSWOD_PAGE_SEARCH_PARAM);
    };

    return (
        <AuthCard
            title={t("auth.resetPassword.state.default.title")}
            description={t("auth.resetPassword.state.default.description")}
            footer={
                <AuthRedirect
                    to={routes.login()}
                    question={t("auth.resetPassword.redirect.default.question")}
                    linkText={t("auth.resetPassword.redirect.default.linkText")}
                />
            }
        >
            <ResetPasswordForm token={token} onSuccess={onSuccess} />
        </AuthCard>
    );
};
