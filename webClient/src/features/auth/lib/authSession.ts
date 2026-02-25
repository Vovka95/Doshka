import type { QueryClient } from "@tanstack/react-query";

import { authApi } from "@/features/auth/api/authApi";

import { accessTokenStore } from "../model/store/accessTokenStore";
import { refreshTokenStorage } from "./refreshTokenStorage";

import type { LoginResponse } from "../model";
import { qk } from "@/shared/lib/react-query/keys";

let refreshPromise: Promise<string> | null = null;

export const authSession = {
    apply(queryClient: QueryClient, data: LoginResponse) {
        accessTokenStore.set(data.accessToken);
        refreshTokenStorage.set(data.refreshToken);

        if (queryClient) {
            queryClient.setQueryData(qk.me(), data.user);
        }
    },

    async refresh(): Promise<string> {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                const rt = refreshTokenStorage.get();

                if (!rt) {
                    throw new Error("No refresh token");
                }

                const data = await authApi.refresh({ refreshToken: rt });

                accessTokenStore.set(data.accessToken);
                refreshTokenStorage.set(data.refreshToken);

                return data.accessToken;
            })().finally(() => {
                refreshPromise = null;
            });
        }

        return refreshPromise;
    },

    clear(queryClient?: QueryClient) {
        refreshPromise = null;

        accessTokenStore.clear();
        refreshTokenStorage.clear();

        if (queryClient) {
            queryClient.setQueryData(qk.me(), null);
        }
    },
};
