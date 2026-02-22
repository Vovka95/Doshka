export type ApiErrorCode =
    | "AUTH_EMAIL_ALREADY_EXISTS"
    | "AUTH_INVALID_CREDENTIALS"
    | "AUTH_EMAIL_NOT_CONFIRMED"
    | "AUTH_ACCESS_DENIED"
    | "AUTH_USER_NOT_FOUND"
    | "AUTH_INVALID_TOKEN"
    | "AUTH_TOKEN_EXPIRED"
    | "UNKNOWN";

export type ApiError = {
    code: ApiErrorCode;
    message: string;
};
