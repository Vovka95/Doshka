import { useEffect } from "react";

import { ToastItem } from "./ToastItem";

import { useUIStore } from "@/shared/store/ui";

export const ToastViewport = () => {
    const toasts = useUIStore((s) => s.toasts);
    const dismissToast = useUIStore((s) => s.dismissToast);

    useEffect(() => {
        const timers = toasts.map((t) =>
            window.setTimeout(() => dismissToast(t.id), t.durationMs),
        );
        return () => timers.forEach((id) => window.clearTimeout(id));
    }, [toasts, dismissToast]);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed right-4 bottom-4 z-50 flex w-90 max-w-[calc(100vw-2rem)] flex-col gap-2">
            {toasts.map((t) => (
                <ToastItem
                    key={t.id}
                    title={t.title}
                    message={t.message}
                    variant={t.variant}
                    onClose={() => dismissToast(t.id)}
                />
            ))}
        </div>
    );
};
