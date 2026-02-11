import { authApi } from "@/features/auth/api/auth.api";
import { accessTokenStore } from "./accessTokenStore";
import { refreshTokenStorage } from "./refreshTokenStorage";

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
