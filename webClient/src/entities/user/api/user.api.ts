import { api } from "@/shared/api/http/api";
import type { User } from "../model/types";

export const userApi = {
    me: async () => {
        const { data } = await api.get<User>("auth/me");
        return data;
    },
};
