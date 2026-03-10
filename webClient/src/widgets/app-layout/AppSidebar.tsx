import { Sidebar } from '@/shared/ui';

import { AppSidebarHeader } from './AppSidebarHeader';
import { AppSidebarNav } from './AppSidebarNav';

type AppSidebarProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

export const AppSidebar = ({
    collapsed = false,
    onNavigate,
}: AppSidebarProps) => {
    return (
        <Sidebar>
            <AppSidebarHeader collapsed={collapsed} onNavigate={onNavigate} />
            <AppSidebarNav collapsed={collapsed} onNavigate={onNavigate} />
        </Sidebar>
    );
};
