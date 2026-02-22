import { Navigate, type RouteObject } from "react-router-dom";

import { GuestGuard } from "@/features/auth/ui";
import { AuthLayout } from "@/widgets/layout";

import { SignupPage } from "@/pages/auth";
import { ConfirmEmailPage } from "@/pages/auth";

const LoginPage = () => <div className="text-sm">Login form here</div>;

export const authRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <GuestGuard />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { index: true, element: <Navigate to="login" replace /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "signup", element: <SignupPage /> },
                    { path: "confirm-email", element: <ConfirmEmailPage /> },
                ],
            },
        ],
    },
];
