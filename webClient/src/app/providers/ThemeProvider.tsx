import { useEffect, type PropsWithChildren } from "react";

import { useThemeStore } from "@/shared/lib/theme/themeStore";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        useThemeStore.getState().apply();

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        const onChange = () => {
            if (useThemeStore.getState().mode === "system") {
                useThemeStore.getState().apply();
            }
        };

        mql.addEventListener("change", onChange);

        return () => {
            mql.removeEventListener("change", onChange);
        };
    }, []);

    return <>{children}</>;
};
