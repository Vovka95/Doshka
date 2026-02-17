import { THEME_LOCAL_STORAGE_KEY, type ThemeMode } from "./theme";

export const themeStorage = {
    get(): ThemeMode | null {
        const raw = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
        if (raw === "light" || raw === "dark" || raw === "system") {
            return raw;
        }

        return null;
    },
    set(mode: ThemeMode) {
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, mode);
    },
    clear() {
        localStorage.removeItem(THEME_LOCAL_STORAGE_KEY);
    },
};
