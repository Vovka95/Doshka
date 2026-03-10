import { Outlet } from 'react-router-dom';

import { AppShell } from '@/shared/ui';
import { AppTopbar } from './AppTopbar';
import { AppSidebar } from './AppSidebar';
import { AppSidebarMobile } from './AppSidebarMobile';

import { useUIStore } from '@/shared/store/ui';

export const AppLayout = () => {
    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const isSidebarMobileOpen = useUIStore((s) => s.isSidebarMobileOpen);

    const sidebarWidth = isSidebarCollapsed ? '64px' : '260px';

    return (
        <AppShell
            topBar={<AppTopbar />}
            sidebar={<AppSidebar collapsed={isSidebarCollapsed} />}
            mobileSidebar={<AppSidebarMobile />}
            isSidebarMobileOpen={isSidebarMobileOpen}
            sidebarWidth={sidebarWidth}
        >
            <Outlet />
        </AppShell>
    );
};
