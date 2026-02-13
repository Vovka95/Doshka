import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { SideBarToggle } from "./SideBarToggle";

export const AppTopbar = () => {
    return (
        <header className="flex h-14 items-center justify-between">
            <SideBarToggle />

            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </header>
    );
};
