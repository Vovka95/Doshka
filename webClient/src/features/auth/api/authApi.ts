import { api } from "@/shared/api/http/api";

import {
    type RefreshDto,
    type RefreshResponse,
    type ResendConfirmationDto,
    type ResendConfirmationResponse,
    type SignupDto,
    type SignupResponse,
    type User,
    type ConfirmEmailDto,
    type ConfirmEmailResponse,
    type LoginDto,
    type LoginResponse,
    type ForgotPasswordDto,
    type ForgotPasswordResponse,
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
    signup: async (dto: SignupDto) => {
        const { data } = await api.post<SignupResponse>("/auth/signup", dto);

        return data;
    },
    login: async (dto: LoginDto) => {
        const { data } = await api.post<LoginResponse>("/auth/login", dto);

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
    logout: async () => {
        const { data } = await api.post("/auth/logout");

        return data;
    },
    forgotPassword: async (dto: ForgotPasswordDto) => {
        const { data } = await api.post<ForgotPasswordResponse>(
            "/auth/forgot-password",
            dto,
        );

        return data;
    },
};
