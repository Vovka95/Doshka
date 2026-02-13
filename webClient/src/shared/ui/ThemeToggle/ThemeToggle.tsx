import { Button } from "../Button";

import type { ThemeMode } from "@/shared/lib/theme/theme";
import { useThemeStore } from "@/shared/store/theme/useThemeStore";

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
        <div
            role="radiogroup"
            aria-label="Theme"
            className="inline-flex rounded-sm border border-border p-1 gap-1"
        >
            {options.map((o) => {
                const active = mode === o.value;
                return (
                    <Button
                        key={o.value}
                        type="button"
                        role="radio"
                        variant="ghost"
                        aria-checked={active}
                        className={cn([
                            active
                                ? "bg-selected text-fg font-medium"
                                : "text-muted-fg",
                        ])}
                        onClick={() => setMode(o.value)}
                    >
                        {o.label}
                    </Button>
                );
            })}
        </div>
    );
};
