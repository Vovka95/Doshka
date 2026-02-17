export const REFRESH_TOKEN_SESSION_STORAGE_KEY = "doshka_refresh_token";

export interface RefreshTokenStorage {
    get(): string | null;
    set(token: string | null): void;
    clear(): void;
}

export const refreshTokenStorage: RefreshTokenStorage = {
    get() {
        return sessionStorage.getItem(REFRESH_TOKEN_SESSION_STORAGE_KEY);
    },
    set(token) {
        if (!token)
            sessionStorage.removeItem(REFRESH_TOKEN_SESSION_STORAGE_KEY);
        else sessionStorage.setItem(REFRESH_TOKEN_SESSION_STORAGE_KEY, token);
    },
    clear() {
        sessionStorage.removeItem(REFRESH_TOKEN_SESSION_STORAGE_KEY);
    },
};
