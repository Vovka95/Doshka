import { useUIStore } from '@/shared/store/ui';
import { AppShell } from '@/shared/ui';
import { SettingsSidebar } from './SettingsSidebar';
import { SettingsSidebarMobile } from './SettingsSidebarMobile';
import { SettingsTopbar } from './SettingsTopBar';
import { Outlet } from 'react-router-dom';

export const SettingsLayout = () => {
    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const isSidebarMobileOpen = useUIStore((s) => s.isSidebarMobileOpen);

    const sidebarWidth = isSidebarCollapsed ? '64px' : '260px';

    return (
        <AppShell
            topBar={<SettingsTopbar />}
            sidebar={<SettingsSidebar collapsed={isSidebarCollapsed} />}
            mobileSidebar={<SettingsSidebarMobile />}
            isSidebarMobileOpen={isSidebarMobileOpen}
            sidebarWidth={sidebarWidth}
        >
            <Outlet />
        </AppShell>
    );
};
