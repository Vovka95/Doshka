import { Header, SidebarToggle } from '@/shared/ui';

export const SettingsTopbar = () => {
    return (
        <Header>
            <div className="flex items-center gap-2">
                <SidebarToggle />
            </div>
        </Header>
    );
};
