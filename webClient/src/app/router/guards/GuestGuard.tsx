import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routes } from "@/app/config/routes";
import { useMeQuery } from "@/entities/user/queries/useMeQuery";

import { FullPageLoader } from "@/shared/ui/full-page-loader";

export const GuestGuard = () => {
    const location = useLocation();
    const me = useMeQuery(true);

    if (me.isLoading) {
        return <FullPageLoader />;
    }

    if (me.isSuccess) {
        const from = (location.state as any)?.from as string | undefined;
        return <Navigate to={from || routes.app()} replace />;
    }

    return <Outlet />;
};
