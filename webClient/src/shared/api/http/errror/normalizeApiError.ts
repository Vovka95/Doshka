import type { AxiosError } from "axios";

import type { ApiError } from "./apiError";

type BackendErrorShape = {
    code?: string;
    message?: string;
    error?: string;
    statusCode?: number;
    details?: unknown;
};

export const normalizeApiError = (err: unknown): ApiError => {
    const fallback: ApiError = {
        code: "UNKNOWN",
        messages: ["Something went wrong"],
    };

    if (!err || typeof err !== "object") return fallback;

    const axiosErr = err as AxiosError<BackendErrorShape>;
    const data = axiosErr.response?.data;

    const code = (data?.code as ApiError["code"]) || fallback.code;
    const message =
        data?.message || data?.error || axiosErr.message || fallback.messages;

    const messageList = Array.isArray(message) ? message : [message];

    return {
        code: (code as any) || "UNKNOWN",
        messages: messageList,
    };
};
