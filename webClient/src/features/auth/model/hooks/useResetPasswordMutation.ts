import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api";

export const useResetPasswordMutation = () => {
    return useMutation({ mutationFn: authApi.resetPassword });
};
