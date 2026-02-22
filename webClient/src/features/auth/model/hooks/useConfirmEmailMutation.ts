import { useMutation } from "@tanstack/react-query";

import { authApi } from "../../api";

export const useConfirmEmailMutation = () => {
    return useMutation({
        mutationFn: (token: string) => authApi.confirmEmail({ token }),
    });
};
