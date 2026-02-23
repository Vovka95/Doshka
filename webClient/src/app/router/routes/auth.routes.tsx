import { Navigate, type RouteObject } from "react-router-dom";

import { GuestGuard } from "@/features/auth/ui";
import { AuthLayout } from "@/widgets/layout";

import { LoginPage, SignupPage, ConfirmEmailPage } from "@/pages/auth";

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
