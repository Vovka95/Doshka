import { api } from "@/shared/api/http/api";

import type { RefreshDto, RefreshResponse, SignupValues, User } from "../model";
import type { MessageResponse } from "@/shared/model";

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
        const { data } = await api.post<MessageResponse>("/auth/signup", dto);

        return data;
    },
};
