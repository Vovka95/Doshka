import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className="min-h-dvh bg-bg text-fg">
            <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4">
                <div className="mb-6">
                    <div className="text-2xl font-semibold">Doshka</div>
                    <div className="mt-1 text-sm text-muted-fg">
                        Sign in to continue
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                    <Outlet />
                </div>

                <div className="mt-6 text-center text-xs text-muted-fg">
                    © {new Date().getFullYear()} Doshka
                </div>
            </div>
        </div>
    );
};
