import { useEffect, useState, type PropsWithChildren } from "react";

import { refreshManager } from "@/shared/api/auth/refreshManager";
import { refreshTokenStorage } from "@/shared/api/auth/refreshTokenStorage";

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const rt = refreshTokenStorage.get();
                if (rt) {
                    await refreshManager.refresh();
                }
            } catch (error) {
                refreshManager.clearSession();
            } finally {
                setReady(true);
            }
        })();
    }, []);

    if (!ready) return null;

    return <>{children}</>;
};
