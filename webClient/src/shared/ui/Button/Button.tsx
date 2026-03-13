import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { Spinner } from '@/shared/ui';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const sizes: Record<ButtonSize, string> = {
    xs: 'h-7 text-xs rounded-xs',
    sm: 'h-8 text-sm rounded-sm',
    md: 'h-9 text-sm rounded-md',
    lg: 'h-10 text-lg rounded-md',
};

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-fg hover:opacity-90',
    secondary: 'bgr-muted text-fg border border-border hover:bg-hover',
    ghost: 'bg-transparent text-fg hover:bg-hover',
    danger: 'bg-danger text-danger-fg hover:opacity-90',
};

const base =
    'inline-flex items-center justify-center gap-2 px-3 whitespace-nowrap rounded-md text-sm font-medium ' +
    'disabled:pointer-events-none disabled:opacity-50';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'sm',
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
                type={type ?? 'button'}
                className={cn(base, sizes[size], variants[variant], className)}
                disabled={isDisabled}
                aria-busy={isLoading || undefined}
                {...props}
            >
                {isLoading ? (
                    <Spinner />
                ) : leftIcon ? (
                    <span className="inline-flex shrink-0 items-center justify-center">
                        {leftIcon}
                    </span>
                ) : null}

                <span className="inline-flex items-center">{children}</span>

                {!isLoading && rightIcon ? (
                    <span className="inline-flex shrink-0 items-center justify-center">
                        {rightIcon}
                    </span>
                ) : null}
            </button>
        );
    },
);

Button.displayName = 'Button';
