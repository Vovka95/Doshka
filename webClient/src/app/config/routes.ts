export const routes = {
    login: () => "/login",
    signup: () => "/signup",
    app: () => "/",
} as const;

export const DEFAULT_AUTH_REDIRECT = routes.app();
