import { useMutation } from "@tanstack/react-query";

import type { SignupValues } from "../schemas";
import { authApi } from "../../api";

export const useSignupMutation = () => {
    return useMutation({
        mutationFn: (dto: SignupValues) => authApi.signup(dto),
    });
};
