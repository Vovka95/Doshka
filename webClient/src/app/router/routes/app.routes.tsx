import { Navigate, type RouteObject } from "react-router-dom";

import { AuthGuard } from "@/features/auth/ui";
import { AppLayout } from "@/widgets/layout";

const InboxPage = () => <div className="text-sm">Inbox</div>;
const MyIssuesPage = () => <div className="text-sm">My issues</div>;
const IssuesPage = () => <div className="text-sm">Issues</div>;
const ProjectsPage = () => <div className="text-sm">Projects</div>;
const WikiPage = () => <div className="text-sm">Wiki</div>;

export const appRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                path: "/",
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/my-issues" replace />,
                    },
                    { path: "/my-issues", element: <MyIssuesPage /> },
                    { path: "/inbox", element: <InboxPage /> },
                    { path: "/projects", element: <ProjectsPage /> },
                    { path: "/issues", element: <IssuesPage /> },
                    { path: "/wiki", element: <WikiPage /> },
                ],
            },
        ],
    },
];
