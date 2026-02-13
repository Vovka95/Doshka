import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { SidebarToggle } from "./SidebarToggle";

export const AppTopbar = () => {
    return (
        <header className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
                <SidebarToggle />
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </header>
    );
};
