import { SidebarMobile } from '@/shared/ui';
import { SettingsSidebar } from './SettingsSidebar';

import { useUIStore } from '@/shared/store/ui';

export const SettingsSidebarMobile = () => {
    const closeSidebarMobile = useUIStore((s) => s.closeSidebarMobile);

    return (
        <SidebarMobile onClose={closeSidebarMobile}>
            <SettingsSidebar
                collapsed={false}
                onNavigate={closeSidebarMobile}
            />
        </SidebarMobile>
    );
};
