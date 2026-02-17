import { authApi } from "@/features/auth/api/authApi";
import { accessTokenStore } from "../../../features/auth/model/store/accessTokenStore";
import { refreshTokenStorage } from "../../../features/auth/lib/refreshTokenStorage";

let refreshPromise: Promise<string> | null = null;

export const refreshManager = {
    async refresh(): Promise<string> {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                const rt = refreshTokenStorage.get();
                const data = await authApi.refresh(
                    rt ? { refreshToken: rt } : undefined,
                );

                accessTokenStore.set(data.accessToken);
                refreshTokenStorage.set(data.refreshToken);

                return data.accessToken;
            })().finally(() => {
                refreshPromise = null;
            });
        }

        return refreshPromise;
    },

    clearSession() {
        accessTokenStore.clear();
        refreshTokenStorage.clear();
    },
};
