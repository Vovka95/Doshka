import { create } from "zustand";
import {
    applyThemeToDom,
    resolveTheme,
    type ResolvedThemeMode,
    type ThemeMode,
} from "../../lib/theme/theme";
import { themeStorage } from "../../lib/theme/themeStorage";

type ThemeState = {
    mode: ThemeMode;
    resolved: ResolvedThemeMode;
    setMode: (mode: ThemeMode) => void;
    syncWithSystem: () => void;
    hydrate: () => void;
};

const computeInitialMode = (): ThemeMode => {
    return themeStorage.get() ?? "system";
};

const computeResolved = (mode: ThemeMode): ResolvedThemeMode => {
    return resolveTheme(mode);
};

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: "system",
    resolved: "light",

    hydrate: () => {
        const mode = computeInitialMode();
        const resolved = computeResolved(mode);
        applyThemeToDom(resolved);

        set({ mode, resolved });
    },
    setMode(mode) {
        themeStorage.set(mode);
        const resolved = computeResolved(mode);
        applyThemeToDom(resolved);

        set({ mode, resolved });
    },
    syncWithSystem() {
        const { mode } = get();
        if (mode !== "system") {
            return;
        }

        const resolved = computeResolved(mode);
        applyThemeToDom(resolved);
        set({ resolved });
    },
}));
