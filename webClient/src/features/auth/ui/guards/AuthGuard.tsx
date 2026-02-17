import { Navigate, Outlet, useLocation } from "react-router-dom";

import { routes } from "@/app/config/routes";
import { useMeQuery } from "@/features/auth/model/hooks/useMeQuery";

import { FullPageLoader } from "@/shared/ui";

export const AuthGuard = () => {
    const location = useLocation();
    const me = useMeQuery();

    if (me.isLoading) {
        return <FullPageLoader />;
    }

    if (me.data) return <Outlet />;

    return (
        <Navigate
            to={routes.login()}
            replace
            state={{ from: location.pathname + location.search }}
        />
    );
};
