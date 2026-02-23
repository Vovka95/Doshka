export const routes = {
    login: () => "/auth/login",
    signup: () => "/auth/signup",
    forgotPassword: () => "/auth/forgot-password",
    app: () => "/app",
    inbox: () => "/app/inbox",
    myIssues: () => "/app/my-issues",
    projects: () => "/app/projects",
    issues: () => "/app/issues",
    wiki: () => "/app/wiki",
} as const;

export const DEFAULT_AUTH_REDIRECT = routes.app();
