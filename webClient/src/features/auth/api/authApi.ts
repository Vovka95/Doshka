import { api } from "@/shared/api/http/api";

import type { RefreshDto, RefreshResponse, User } from "../model";

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
};
