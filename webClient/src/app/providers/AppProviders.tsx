import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";

import { AuthBootstrap } from "@/features/auth/ui";

import { router } from "../router/router";

export const AppProviders = () => {
    return (
        <QueryProvider>
            <AuthBootstrap>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthBootstrap>
        </QueryProvider>
    );
};
