import { createBrowserRouter } from "react-router-dom";

import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";
import { AppLayout } from "@/widgets/layout/AppLayout";
import { AuthLayout } from "@/widgets/layout/AuthLayout";

const InboxPage = () => <div className="text-sm">Inbox</div>;
const MyIssuesPage = () => <div className="text-sm">My issues</div>;
const IssuesPage = () => <div className="text-sm">Issues</div>;
const ProjectsPage = () => <div className="text-sm">Projects</div>;
const WikiPage = () => <div className="text-sm">Wiki</div>;

const LoginPage = () => <div className="text-sm">Login form here</div>;
const SignupPage = () => <div className="text-sm">Signup form here</div>;

export const router = createBrowserRouter([
    {
        element: <GuestGuard />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "/login", element: <LoginPage /> },
                    { path: "/signup", element: <SignupPage /> },
                ],
            },
        ],
    },
    {
        element: <AuthGuard />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: "/",
                        element: <MyIssuesPage />,
                    },
                    {
                        path: "/my-issues",
                        element: <MyIssuesPage />,
                    },
                    {
                        path: "/inbox",
                        element: <InboxPage />,
                    },
                    {
                        path: "/projects",
                        element: <ProjectsPage />,
                    },
                    {
                        path: "/issues",
                        element: <IssuesPage />,
                    },
                    {
                        path: "/wiki",
                        element: <WikiPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <div>Not found</div>,
    },
]);
