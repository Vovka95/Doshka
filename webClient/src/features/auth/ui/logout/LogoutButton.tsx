import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/shared/ui";

import { authSession } from "../../lib/authSession";

import { useLogoutMutation } from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";
import { t } from "@/shared/lib/i18n";

export const LogoutButton = () => {
    const queryClient = useQueryClient();
    const toast = useUIStore((s) => s.toast);
    const logoutMutation = useLogoutMutation();

    const handleOnClick = async () => {
        try {
            await logoutMutation.mutateAsync();

            authSession.clear(queryClient);

            toast({
                variant: "success",
                title: t("auth.logout.toast.success.title"),
                message: t("auth.logout.toast.success.message"),
            });
        } catch (error) {
            authSession.clear(queryClient);

            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.logout.toast.error.title"),
                message: apiError.messages[0],
            });
        }
    };

    return (
        <Button
            variant="secondary"
            onClick={handleOnClick}
            disabled={logoutMutation.isPending}
        >
            {t("auth.logout.button.idle")}
        </Button>
    );
};
