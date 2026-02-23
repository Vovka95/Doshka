export const routes = {
    login: () => "/auth/login",
    signup: () => "/auth/signup",
    forgotPassword: () => "/auth/forgot-password",
    app: () => "/",
    inbox: () => "/inbox",
    myIssues: () => "/my-issues",
    projects: () => "projects",
    issues: () => "/issues",
    wiki: () => "/wiki",
} as const;

export const DEFAULT_AUTH_REDIRECT = routes.myIssues();
