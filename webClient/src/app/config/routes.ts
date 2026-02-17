export const routes = {
    login: () => "/login",
    signup: () => "/signup",
    inbox: () => "/inbox",
    myIssues: () => "/",
    projects: () => "projects",
    issues: () => "/issues",
    wiki: () => "/wiki",
} as const;

export const DEFAULT_AUTH_REDIRECT = routes.myIssues();
