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
            <div className="grid h-full grid-cols-1 lg:grid-cols-[var(--sidebar-w)_1fr] lg:transition-[grid-template-columns] lg:duration-200">
                {!isMobile && sidebar}
                <div
                    className={cn([
                        'flex min-w-0 flex-col py-2 pr-2',
                        isMobile && 'pb-0 pr-0',
                    ])}
                >
                    {topBar}

                    <main
                        className={cn([
                            'rounded-sm border border-border bg-card min-w-0 flex-1 p-6 overflow-auto',
                            isSidebarMobileOpen && 'overflow-hidden',
                            isMobile && 'rounded-none',
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
