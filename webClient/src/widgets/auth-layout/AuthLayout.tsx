import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="h-dvh overflow-y-auto bg-bg text-fg">
            <div className="mx-auto h-full max-w-md px-4">
                <div className="flex min-h-full flex-col justify-center py-8">
                    <Outlet />

                    <div className="mt-6 pb-2 text-center text-xs text-muted-fg">
                        © {new Date().getFullYear()} Doshka
                    </div>
                </div>
            </div>
        </div>
    );
};
