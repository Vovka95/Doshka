import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

import { useIsMobile } from '@/shared/lib/hooks';

import { cn } from '@/shared/lib/cn';

export type AppShellProps = PropsWithChildren & {
    className?: string;
    contentClassName?: string;
    sidebar: ReactNode;
    mobileSidebar: ReactNode;
    topBar: ReactNode;
    isSidebarMobileOpen: boolean;
    sidebarWidth: string;
};

type ShellStyle = CSSProperties & {
    '--sidebar-w': string;
};

export const AppShell = ({
    topBar,
    sidebar,
    mobileSidebar,
    isSidebarMobileOpen,
    sidebarWidth,
    className,
    contentClassName,
    children,
}: AppShellProps) => {
    const isMobile = useIsMobile();

    const style: ShellStyle = {
        '--sidebar-w': sidebarWidth,
    };

    return (
        <div
            className={cn('h-dvh overflow-hidden bg-bg text-fg', className)}
            style={style}
        >
            <div className="grid h-full p-2 grid-cols-1 lg:grid-cols-[var(--sidebar-w)_1fr] lg:transition-[grid-template-columns] lg:duration-200">
                {!isMobile && sidebar}
                <div className="flex min-w-0 flex-col">
                    {topBar}

                    <main
                        className={cn([
                            'rounded-sm border border-border bg-card min-w-0 flex-1 p-6 overflow-auto',
                            isSidebarMobileOpen && 'overflow-hidden',
                            contentClassName,
                        ])}
                    >
                        {children}
                    </main>
                </div>
            </div>

            {isMobile && isSidebarMobileOpen && mobileSidebar}
        </div>
    );
};
