export const routes = {
    login: () => "/login",
    signup: () => "/signup",
    app: () => "/",
    inbox: () => "/inbox",
    myIssues: () => "/my-issues",
    projects: () => "projects",
    issues: () => "/issues",
    wiki: () => "/wiki",
} as const;

export const DEFAULT_AUTH_REDIRECT = routes.inbox();
