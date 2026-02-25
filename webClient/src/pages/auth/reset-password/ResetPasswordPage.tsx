import { routes } from "@/app/config/routes";
import { ResetPasswordForm } from "@/features/auth/ui";
import {
    useReadURLSearchParam,
    useRemoveURLSearchParam,
} from "@/shared/lib/hooks";
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
            title="Reset your password"
            description="Create a new password for your account."
            footer={
                <AuthRedirect to={routes.login()} linkText="Back to login" />
            }
        >
            <ResetPasswordForm token={token} onSuccess={onSuccess} />
        </AuthCard>
    );
};
