import { createBrowserRouter, Navigate } from "react-router-dom";

import { authRoutes, appRoutes, notFoundRoute } from "./routes";

import { RootLayout } from "@/widgets/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="app" replace />,
            },
            ...authRoutes,
            ...appRoutes,
            notFoundRoute,
        ],
    },
]);
