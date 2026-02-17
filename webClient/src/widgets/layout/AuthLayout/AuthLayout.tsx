import { Outlet } from "react-router-dom";

import { ToastViewport } from "@/shared/ui";

export const AuthLayout = () => {
    return (
        <div className="min-h-dvh bg-bg text-fg">
            <ToastViewport />

            <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4">
                <Outlet />

                <div className="mt-6 text-center text-xs text-muted-fg">
                    © {new Date().getFullYear()} Doshka
                </div>
            </div>
        </div>
    );
};
