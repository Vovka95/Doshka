import { api } from "@/shared/api/http/api";

import type {
    RefreshDto,
    RefreshResponse,
    ResendConfirmationDto,
    ResendConfirmationResponse,
    SignupValues,
    SignupResponse,
    User,
    ConfirmEmailDto,
    ConfirmEmailResponse,
} from "../model";

export const authApi = {
    me: async () => {
        const { data } = await api.get<User>("auth/me");
        return data;
    },
    refresh: async (dto?: RefreshDto) => {
        const { data } = await api.post<RefreshResponse>(
            "/auth/refresh",
            dto ?? {},
        );
        return data;
    },
    signup: async (dto: SignupValues) => {
        const { data } = await api.post<SignupResponse>("/auth/signup", dto);

        return data;
    },
    confirmEmail: async (dto: ConfirmEmailDto) => {
        const { data } = await api.get<ConfirmEmailResponse>(
            `/auth/confirm-email?token=${dto.token}`,
        );
        return data;
    },
    resendConfirmation: async (dto: ResendConfirmationDto) => {
        const { data } = await api.post<ResendConfirmationResponse>(
            "/auth/resend-confirmation",
            dto,
        );

        return data;
    },
};
