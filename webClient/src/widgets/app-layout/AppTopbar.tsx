import { SidebarToggle, ThemeToggle } from '@/shared/ui';

import { LogoutButton } from '@/features/auth/ui';

export const AppTopbar = () => {
    return (
        <header className="flex justify-between px-2 pb-2">
            <div className="flex items-center gap-2">
                <SidebarToggle />
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>

            <LogoutButton />
        </header>
    );
};
