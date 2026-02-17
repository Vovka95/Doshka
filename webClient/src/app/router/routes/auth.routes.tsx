import { Navigate, type RouteObject } from "react-router-dom";

import { GuestGuard } from "@/features/auth/ui";
import { AuthLayout } from "@/widgets/layout";

const LoginPage = () => <div className="text-sm">Login form here</div>;
const SignupPage = () => <div className="text-sm">Signup form here</div>;

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
                ],
            },
        ],
    },
];
