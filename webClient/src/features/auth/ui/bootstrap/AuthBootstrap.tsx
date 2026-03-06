import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type PropsWithChildren } from 'react';

import { authSession } from '../../lib/authSession';

import { FullPageLoader } from '@/shared/ui';

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await authSession.refresh();
            } catch (error) {
                console.error(error);
                authSession.clear(queryClient);
            } finally {
                setReady(true);
            }
        })();
    }, [queryClient]);

    if (!ready) return <FullPageLoader />;

    return <>{children}</>;
};
