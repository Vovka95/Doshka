import { ThemeToggle } from "@/shared/ui/theme-toggle";

export const AppTopbar = () => {
    return (
        <header className="flex h-14 items-center justify-between">
            <div className="text-sm text-muted-fg">
                Search / breadcrumbs later
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </header>
    );
};
