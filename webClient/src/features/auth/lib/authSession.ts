import type { QueryClient } from '@tanstack/react-query';

import { authApi } from '@/features/auth/api/authApi';

import { accessTokenStore } from '../model/store/accessTokenStore';

import type { LoginResponse } from '../model';
import { qk } from '@/shared/lib/react-query/keys';

import { getAuthChannel } from '@/shared/lib/channels';

let refreshPromise: Promise<string> | null = null;
let isLoggingOut = false;
const authChannel = getAuthChannel();

export const authSession = {
    apply(queryClient: QueryClient, data: LoginResponse) {
        isLoggingOut = false;

        accessTokenStore.set(data.accessToken);

        queryClient.setQueryData(qk.me(), data.user);
    },

    async refresh(): Promise<string> {
        if (isLoggingOut) {
            throw new Error('Logout in progress');
        }

        if (!refreshPromise) {
            refreshPromise = (async () => {
                const data = await authApi.refresh();

                if (isLoggingOut) {
                    throw new Error('Logout in progress');
                }

                accessTokenStore.set(data.accessToken);

                return data.accessToken;
            })().finally(() => {
                refreshPromise = null;
            });
        }

        return refreshPromise;
    },

    resetClientState(queryClient?: QueryClient) {
        refreshPromise = null;
        accessTokenStore.clear();

        if (queryClient) {
            queryClient.cancelQueries();
            queryClient.setQueryData(qk.me(), null);
        }
    },

    startLogout(queryClient: QueryClient) {
        isLoggingOut = true;
        authChannel?.postMessage({ type: 'logout' });

        this.resetClientState(queryClient);
    },

    finishLogout() {
        refreshPromise = null;
        isLoggingOut = false;
    },

    clear(queryClient?: QueryClient) {
        isLoggingOut = false;
        this.resetClientState(queryClient);
    },

    getIsLoggingOut() {
        return isLoggingOut;
    },
};
