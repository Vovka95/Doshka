import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { Spinner } from "../Spinner";

import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-3.5 text-sm",
    lg: "h-10 px-4 text-sm",
};

const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-fg hover:opacity-90",
    secondary: "bgr-muted text-fg border border-border hover:bg-hover",
    ghost: "bg-transparent text-fg hover:bg-hover",
    danger: "bg-danger text-danger-fg hover:opacity-90",
};

const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "sm",
            isLoading = false,
            leftIcon,
            rightIcon,
            disabled,
            children,
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
                {isLoading ? (
                    <Spinner />
                ) : leftIcon ? (
                    <span className="inline-flex shrink-0 items-center">
                        {leftIcon}
                    </span>
                ) : null}

                <span className="inline-flex items-center">{children}</span>

                {!isLoading && rightIcon ? (
                    <span className="inline-flex shrink-0 items-center">
                        {rightIcon}
                    </span>
                ) : null}
            </button>
        );
    },
);

Button.displayName = "Button";
