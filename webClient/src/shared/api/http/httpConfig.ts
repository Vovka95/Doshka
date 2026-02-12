import { env } from "@/app/config/env";

export const httpConfig = {
    baseUrl: `${env.apiBaseUrl}/api`,
    timeoutMs: 20_000,
    withCredentials: false,
};
