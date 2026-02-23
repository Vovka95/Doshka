import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/shared/ui";

import { authSession } from "../../lib/authSession";

import { useLogoutMutation } from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { routes } from "@/app/config/routes";
import { normalizeApiError } from "@/shared/api/http/errror";

export const LogoutButton = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useUIStore((s) => s.toast);
    const logoutMutation = useLogoutMutation();

    const handleOnClick = async () => {
        try {
            await logoutMutation.mutateAsync();

            authSession.clear(queryClient);

            toast({
                variant: "success",
                title: "Signed out",
                message: "You've been logged out.",
            });

            navigate(routes.login(), { replace: true });
        } catch (error) {
            authSession.clear(queryClient);

            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Logout failed",
                message: apiError.message,
            });

            navigate(routes.login(), { replace: true });
        }
    };

    return (
        <Button
            variant="secondary"
            onClick={handleOnClick}
            disabled={logoutMutation.isPending}
        >
            Log out
        </Button>
    );
};
