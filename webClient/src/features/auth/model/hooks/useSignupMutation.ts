import { useMutation } from "@tanstack/react-query";

import { authApi } from "../../api";

export const useSignupMutation = () => {
    return useMutation({
        mutationFn: authApi.signup,
    });
};
