import { useEffect } from "react";

import { IconButton } from "@/shared/ui/IconButton";

import { useUIStore, type ModalSize } from "@/shared/store/ui";
import { cn } from "@/shared/lib/cn";
import { XIcon } from "lucide-react";

const sizeClass: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
};

export const ModalHost = () => {
    const modal = useUIStore((s) => s.modal);
    const closeModal = useUIStore((s) => s.closeModal);

    useEffect(() => {
        if (!modal) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && (modal.dismissible ?? true)) closeModal();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [modal, closeModal]);

    useEffect(() => {
        if (!modal) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prev;
        };
    }, [modal]);

    if (!modal) return null;

    const dismissible = modal.dismissible ?? true;
    const size = modal.size ?? "md";

    return (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            <div
                className={cn(
                    "absolute inset-0 flex items-start justify-center overflow-y-auto p-2 pt-[12vh] bg-black/50",
                )}
                onClick={() => dismissible && closeModal()}
            >
                <div
                    className={cn(
                        "w-full rounded-xl border border-border bg-card shadow-xl",
                        sizeClass[size],
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {(modal.title || dismissible) && (
                        <div className="shrink-0 flex items-center justify-between border-b border-border px-4 py-3">
                            <div className="text-sm font-semibold">
                                {modal.title ?? ""}
                            </div>

                            {dismissible && (
                                <IconButton
                                    className="text-muted-fg"
                                    aria-label="Close modal"
                                    icon={<XIcon size={16} />}
                                    variant="ghost"
                                    size="sm"
                                    onClick={closeModal}
                                />
                            )}
                        </div>
                    )}

                    <div className="p-4 overflow-y-auto">{modal.content}</div>
                </div>
            </div>
        </div>
    );
};
