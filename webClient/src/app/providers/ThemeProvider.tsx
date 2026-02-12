import { useEffect, type PropsWithChildren } from "react";

import { useThemeStore } from "@/shared/store/theme/useThemeStore";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const hydrate = useThemeStore((s) => s.hydrate);
    const syncWithSystem = useThemeStore((s) => s.syncWithSystem);

    useEffect(() => {
        hydrate();

        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        const onChange = () => syncWithSystem();

        mql.addEventListener("change", onChange);

        return () => {
            mql.removeEventListener("change", onChange);
        };
    }, [hydrate, syncWithSystem]);

    return <>{children}</>;
};
