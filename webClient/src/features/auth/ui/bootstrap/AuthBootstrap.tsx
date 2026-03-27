import { useEffect, useState, type PropsWithChildren } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { authSession } from '../../lib/authSession';

import { FullPageLoader } from '@/shared/ui';

import { getAuthChannel } from '@/shared/lib/channels';

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let isActive = true;

        (async () => {
            try {
                await authSession.refresh();
            } catch (error) {
                console.error(error);
                authSession.clear(queryClient);
            } finally {
                if (isActive) {
                    setReady(true);
                }
            }
        })();

        return () => {
            isActive = false;
        };
    }, [queryClient]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const authChannel = getAuthChannel();

        if (authChannel) {
            authChannel.onmessage = (event) => {
                if (event.data?.type === 'logout') {
                    authSession.clear(queryClient);
                }
            };
        }

        return () => {
            authChannel?.close();
        };
    }, [queryClient]);

    if (!ready) return <FullPageLoader />;

    return <>{children}</>;
};
