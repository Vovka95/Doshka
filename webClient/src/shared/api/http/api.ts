import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { httpConfig } from "./httpConfig";
import { accessTokenStore } from "../auth/accessTokenStore";
import { refreshManager } from "../auth/refreshManager";

export const api = axios.create({
    baseURL: httpConfig.baseUrl,
    timeout: httpConfig.timeoutMs,
    withCredentials: httpConfig.withCredentials,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = accessTokenStore.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const original = error.config as RetriableConfig | undefined;

        if (!original) {
            return Promise.reject(error);
        }

        if (
            original.url?.includes("/auth/refresh") ||
            original.url?.includes("/auth/login")
        ) {
            return Promise.reject(error);
        }

        if (status === 401 && !original._retry) {
            original._retry = true;

            try {
                await refreshManager.refresh();
                return api(original);
            } catch (e) {
                refreshManager.clearSession();
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    },
);
