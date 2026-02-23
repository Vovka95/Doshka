import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type PropsWithChildren } from "react";

import { authSession } from "../../lib/authSession";
import { refreshTokenStorage } from "../../lib/refreshTokenStorage";

import { FullPageLoader } from "@/shared/ui";

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const rt = refreshTokenStorage.get();
                if (rt) {
                    await authSession.refresh();
                }
            } catch (error) {
                authSession.clear(queryClient);
            } finally {
                setReady(true);
            }
        })();
    }, []);

    if (!ready) return <FullPageLoader />;

    return <>{children}</>;
};
