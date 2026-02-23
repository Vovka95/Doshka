import { createBrowserRouter } from "react-router-dom";

import { authRoutes, appRoutes, notFoundRoute } from "./routes";

import { RootLayout } from "@/widgets/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [...authRoutes, ...appRoutes, notFoundRoute],
    },
]);
