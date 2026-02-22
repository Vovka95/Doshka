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
        message: "Something went wrong",
    };

    if (!err || typeof err !== "object") return fallback;

    const axiosErr = err as AxiosError<BackendErrorShape>;
    const data = axiosErr.response?.data;

    const code = (data?.code as ApiError["code"]) || fallback.code;
    const message =
        data?.message || data?.error || axiosErr.message || fallback.message;

    return {
        code: (code as any) || "UNKNOWN",
        message,
    };
};
