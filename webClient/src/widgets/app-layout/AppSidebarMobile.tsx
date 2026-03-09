import { useUIStore } from '@/shared/store/ui';
import { AppSidebar } from './AppSidebar';

export const AppSidebarMobile = () => {
    const closeSidebarMobile = useUIStore((s) => s.closeSidebarMobile);

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={closeSidebarMobile}
            />
            <div className="absolute inset-y-0 left-0 w-70 bg-card shadow-xl">
                <AppSidebar collapsed={false} onNavigate={closeSidebarMobile} />
            </div>
        </div>
    );
};
