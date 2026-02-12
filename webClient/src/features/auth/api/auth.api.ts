import { api } from "@/shared/api/http/api";
import type { RefreshDto, RefreshResponse } from "../model/types";

export const authApi = {
    refresh: async (dto?: RefreshDto) => {
        const { data } = await api.post<RefreshResponse>(
            "/auth/refresh",
            dto ?? {},
        );
        return data;
    },
};
