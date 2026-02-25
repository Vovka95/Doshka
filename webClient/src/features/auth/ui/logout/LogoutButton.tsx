import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/shared/ui";

import { authSession } from "../../lib/authSession";

import { useLogoutMutation } from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";

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
                title: "Signed out",
                message: "You've been logged out.",
            });
        } catch (error) {
            authSession.clear(queryClient);

            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Logout failed",
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
            Log out
        </Button>
    );
};
