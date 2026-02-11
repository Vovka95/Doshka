export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

export const THEME_LOCAL_STORAGE_KEY = "doshka_theme_mode";

export const getSystemTheme = (): ResolvedThemeMode => {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const resolveTheme = (mode: ThemeMode): ResolvedThemeMode => {
    return mode === "system" ? getSystemTheme() : mode;
};

export const applyThemeToDom = (resolved: ResolvedThemeMode) => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
};
