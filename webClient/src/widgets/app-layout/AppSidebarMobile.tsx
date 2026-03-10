import { useUIStore } from '@/shared/store/ui';
import { SidebarMobile } from '@/shared/ui';

import { AppSidebar } from './AppSidebar';

export const AppSidebarMobile = () => {
    const closeSidebarMobile = useUIStore((s) => s.closeSidebarMobile);

    return (
        <SidebarMobile onClose={closeSidebarMobile}>
            <AppSidebar collapsed={false} onNavigate={closeSidebarMobile} />
        </SidebarMobile>
    );
};
