import axios from "axios";

export type ApiError = {
    code: string;
    message: string;
};

export const getApiError = (error: unknown): ApiError | null => {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiError;
    }

    return null;
};
