import { IconButton } from "@/shared/ui/IconButton";

import type { ToastVariant } from "@/shared/store/ui";
import { cn } from "@/shared/lib/cn";
import { XIcon } from "lucide-react";

const variantBorder: Record<ToastVariant, string> = {
    default: "border-border text-border",
    success: "border-emerald-500/40 text-emerald-500/40",
    warning: "border-amber-500/40 text-amber-500/40",
    error: "border-rose-500/40 text-rose-500/40",
};

type ToastItemProps = {
    title: string;
    message?: string;
    variant: ToastVariant;
    onClose: () => void;
};

export const ToastItem = ({
    title,
    message,
    variant,
    onClose,
}: ToastItemProps) => {
    return (
        <div
            className={cn(
                "rounded-xl border-b-3 bg-card p-3 shadow-lg",
                variantBorder[variant],
            )}
            role="status"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-semibold">{title}</div>
                    {message && (
                        <div className="mt-0.5 text-sm text-muted-fg">
                            {message}
                        </div>
                    )}
                </div>

                <IconButton
                    className="text-muted-fg"
                    aria-label="Close toast"
                    icon={<XIcon size={16} />}
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};
