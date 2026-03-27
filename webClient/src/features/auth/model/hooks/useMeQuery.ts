import { useQuery } from '@tanstack/react-query';

import { authApi } from '../../api';
import { qk } from '@/shared/lib/react-query/keys';

import { authSession } from '../../lib/authSession';
import { accessTokenStore } from '../store/accessTokenStore';

export const useMeQuery = () => {
    return useQuery({
        queryKey: qk.me(),
        queryFn: authApi.me,
        enabled:
            !authSession.getIsLoggingOut() && Boolean(accessTokenStore.get()),
        retry: false,
        staleTime: 0,
        refetchOnMount: 'always',
    });
};
