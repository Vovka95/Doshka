import { Outlet } from "react-router-dom";

import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

import { useUIStore } from "@/shared/store/ui";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";

export const AppLayout = () => {
    const isMobile = useIsMobile();
    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const isSidebarMobileOpen = useUIStore((s) => s.isSidebarMobileOpen);
    const closeSidebarMobile = useUIStore((s) => s.closeSidebarMobile);

    const sidebarWidth = isSidebarCollapsed ? "60px" : "260px";

    return (
        <div
            className="min-h-dvh bg-bg text-fg"
            style={{ ["--sidebar-w" as any]: sidebarWidth }}
        >
            <div className="grid min-h-dvh p-2 grid-cols-1 lg:grid-cols-[var(--sidebar-w)_1fr] lg:transition-[grid-template-columns] lg:duration-200">
                {!isMobile && <AppSidebar collapsed={isSidebarCollapsed} />}
                <div className="flex min-w-0 flex-col">
                    <AppTopbar />

                    <main className="rounded-sm border border-border bg-card min-w-0 flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>

            {isMobile && isSidebarMobileOpen ? (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeSidebarMobile}
                    />
                    <div className="absolute inset-y-0 left-0 w-70 bg-card shadow-xl">
                        <AppSidebar
                            collapsed={false}
                            onNavigate={closeSidebarMobile}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
