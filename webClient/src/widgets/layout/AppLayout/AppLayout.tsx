import { Outlet } from "react-router-dom";

import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

export const AppLayout = () => {
    return (
        <div className="min-h-dvh bg-bg text-fg">
            <div className="grid min-h-dvh grid-cols-[260px_1fr] p-2">
                <AppSidebar />
                <div className="flex min-w-0 flex-col">
                    <AppTopbar />

                    <main className="rounded-sm border border-border bg-card min-w-0 flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
