import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    apply: () => void;
};

const LOCAL_STORAGE_KEY = "doshka_theme_mode";

const getSystemPref = (): "light" | "dark" => {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const resolveMode = (mode: ThemeMode): "light" | "dark" => {
    return mode === "system" ? getSystemPref() : mode;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: (localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeMode) ?? "system",
    setMode: (mode: ThemeMode) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, mode);
        set({ mode });
        get().apply();
    },
    apply: () => {
        const isDark = resolveMode(get().mode) === "dark";
        document.documentElement.classList.toggle("dark", isDark);
    },
}));
