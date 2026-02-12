import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/user.api";
import { qk } from "@/shared/lib/react-query/keys";

export const useMeQuery = (enabled: boolean = true) => {
    return useQuery({
        queryKey: qk.me(),
        queryFn: userApi.me,
        enabled,
        retry: false,
        staleTime: 60_000,
    });
};
