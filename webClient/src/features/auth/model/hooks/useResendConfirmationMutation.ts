import { useMutation } from "@tanstack/react-query";

import { authApi } from "../../api";
import type { ResendConfirmationDto } from "../types";

export const useResendConfirmationMutation = () => {
    return useMutation({
        mutationFn: (dto: ResendConfirmationDto) =>
            authApi.resendConfirmation(dto),
    });
};
