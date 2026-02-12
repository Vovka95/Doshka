import type { ThemeMode } from "@/shared/lib/theme/theme";
import { useThemeStore } from "@/shared/lib/theme/useThemeStore";

import { cn } from "@/shared/lib/cn";

const options: { value: ThemeMode; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
];

export const ThemeToggle = () => {
    const mode = useThemeStore((s) => s.mode);
    const setMode = useThemeStore((s) => s.setMode);

    return (
        <div className="inline-flex rounded-md border border-border bg-card p-1">
            {options.map((o) => {
                const active = mode === o.value;
                return (
                    <button
                        key={o.value}
                        type="button"
                        onClick={() => setMode(o.value)}
                        className={cn([
                            "h-8 rounded px-3 text-sm transition",
                            active
                                ? "bg-muted text-fg"
                                : "text-muted-fg hover:bg-muted/60",
                        ])}
                    >
                        {o.label}
                    </button>
                );
            })}
        </div>
    );
};
