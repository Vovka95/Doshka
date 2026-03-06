import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { routes } from '@/app/config/routes';
import { useMeQuery } from '@/features/auth/model/hooks/useMeQuery';

import { FullPageLoader } from '@/shared/ui';

type LocationState = {
    from?: string;
};

export const GuestGuard = () => {
    const location = useLocation();
    const me = useMeQuery(true);

    if (me.isLoading) {
        return <FullPageLoader />;
    }

    if (me.data) {
        const from = (location.state as LocationState)?.from;
        return <Navigate to={from || routes.app()} replace />;
    }

    return <Outlet />;
};
