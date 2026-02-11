import { api } from "@/shared/api/http/api";

export type RefreshResponse = {
    accessToken: string;
    refreshToken: string;
};

export type RefreshDto = {
    refreshToken: string;
};

export const authApi = {
    refresh: async (dto?: RefreshDto) => {
        const { data } = await api.post<RefreshResponse>(
            "/auth/refresh",
            dto ?? {},
        );
        return data;
    },
};
