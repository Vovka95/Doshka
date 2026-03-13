import { Header, SidebarToggle } from '@/shared/ui';

export const AppTopbar = () => {
    return (
        <Header>
            <div className="flex items-center gap-2">
                <SidebarToggle />
            </div>

            <div className="flex items-center gap-2"></div>
        </Header>
    );
};
