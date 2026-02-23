import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/authApi";

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: authApi.logout,
    });
};
