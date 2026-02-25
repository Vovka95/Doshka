import { useMutation } from "@tanstack/react-query";

import { authApi } from "../../api";

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
    });
};
