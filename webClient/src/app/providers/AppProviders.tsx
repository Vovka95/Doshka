import { type PropsWithChildren } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";
import { AuthBootstrap } from "./AuthBootstrap";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

export const AppProviders = ({ children }: PropsWithChildren) => {
    return (
        <QueryProvider>
            <AuthBootstrap>
                <ThemeProvider>
                    {children}
                    <ThemeToggle />
                </ThemeProvider>
            </AuthBootstrap>
        </QueryProvider>
    );
};
