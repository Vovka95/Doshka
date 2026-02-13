import * as React from "react";

import { Spinner } from "../Spinner";

import { cn } from "@/shared/lib/cn";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> & {
    icon: React.ReactNode;
    "aria-label": string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    isLoading?: boolean;
};

const base =
    "inline-flex items-center justify-center rounded-sm transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<IconButtonSize, string> = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
};

const variants: Record<IconButtonVariant, string> = {
    primary: "bg-primary text-primary-fg hover:opacity-90",
    secondary: "bg-muted text-fg border border-border hover:bg-hover",
    ghost: "bg-transparent text-fg hover:bg-hover",
    danger: "bg-danger text-danger-fg hover:opacity-90",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            className,
            variant = "ghost",
            size = "md",
            icon,
            isLoading = false,
            disabled,
            type,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                type={type ?? "button"}
                className={cn(base, sizes[size], variants[variant], className)}
                disabled={isDisabled}
                aria-busy={isLoading || undefined}
                {...props}
            >
                {isLoading ? <Spinner /> : icon}
            </button>
        );
    },
);
IconButton.displayName = "IconButton";
