import { Outlet } from "react-router-dom";

import { ModalHost, ToastViewport } from "@/shared/ui";

export const RootLayout = () => {
    return (
        <div className="min-h-dvh bg-bg text-fg">
            <Outlet />

            <ToastViewport />
            <ModalHost />
        </div>
    );
};
