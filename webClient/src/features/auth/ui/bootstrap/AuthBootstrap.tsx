import { useEffect, useState, type PropsWithChildren } from "react";

import { refreshManager } from "../../lib/refreshManager";
import { refreshTokenStorage } from "../../lib/refreshTokenStorage";

import { FullPageLoader } from "@/shared/ui";

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

    if (!ready) return <FullPageLoader />;

    return <>{children}</>;
};
