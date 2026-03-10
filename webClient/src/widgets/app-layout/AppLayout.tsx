import type { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';

import { AppTopbar } from './AppTopbar';
import { AppSidebar } from './AppSidebar';
import { AppSidebarMobile } from './AppSidebarMobile';

import { useUIStore } from '@/shared/store/ui';
import { useIsMobile } from '@/shared/lib/hooks/media-query';

import { cn } from '@/shared/lib/cn';

type AppLayoutStyle = CSSProperties & {
    '--sidebar-w': string;
};

export const AppLayout = () => {
    const isMobile = useIsMobile();
    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const isSidebarMobileOpen = useUIStore((s) => s.isSidebarMobileOpen);

    const sidebarWidth = isSidebarCollapsed ? '64px' : '260px';

    const layoutStyle: AppLayoutStyle = {
        '--sidebar-w': sidebarWidth,
    };

    return (
        <div
            className="h-dvh overflow-hidden bg-bg text-fg"
            style={layoutStyle}
        >
            <div className="grid h-full p-2 grid-cols-1 lg:grid-cols-[var(--sidebar-w)_1fr] lg:transition-[grid-template-columns] lg:duration-200">
                {!isMobile && <AppSidebar collapsed={isSidebarCollapsed} />}
                <div className="flex min-w-0 flex-col">
                    <AppTopbar />

                    <main
                        className={cn([
                            'rounded-sm border border-border bg-card min-w-0 flex-1 p-6 overflow-auto',
                            isSidebarMobileOpen && 'overflow-hidden',
                        ])}
                    >
                        <Outlet />
                    </main>
                </div>
            </div>

            {isMobile && isSidebarMobileOpen && <AppSidebarMobile />}
        </div>
    );
};
