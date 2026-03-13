import { SidebarMobile } from '@/shared/ui';
import { AppSidebar } from './AppSidebar';

import { useUIStore } from '@/shared/store/ui';

export const AppSidebarMobile = () => {
    const closeSidebarMobile = useUIStore((s) => s.closeSidebarMobile);

    return (
        <SidebarMobile onClose={closeSidebarMobile}>
            <AppSidebar collapsed={false} onNavigate={closeSidebarMobile} />
        </SidebarMobile>
    );
};
