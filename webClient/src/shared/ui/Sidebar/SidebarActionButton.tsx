import {
    forwardRef,
    type ButtonHTMLAttributes,
    type CSSProperties,
    type ReactNode,
} from 'react';

import { cn } from '@/shared/lib/cn';
import { Spinner } from '@/shared/ui';

export type SidebarActionButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'danger';

export type SidebarActionButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type SidebarActionButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
        collapsed?: boolean;
        variant?: SidebarActionButtonVariant;
        size?: SidebarActionButtonSize;
        isLoading?: boolean;
    };

const sizes: Record<SidebarActionButtonSize, string> = {
    xs: 'h-7 text-xs rounded-xs',
    sm: 'h-8 text-sm rounded-sm',
    md: 'h-9 text-sm rounded-md',
    lg: 'h-10 text-sm rounded-md',
};

const variants: Record<SidebarActionButtonVariant, string> = {
    primary: 'bg-primary text-primary-fg hover:opacity-90',
    secondary: 'bg-muted text-fg border border-border hover:bg-hover',
    ghost: 'bg-transparent text-fg hover:bg-hover',
    danger: 'bg-danger text-danger-fg hover:opacity-90',
};

const base =
    'inline-flex w-full items-center whitespace-nowrap font-medium ' +
    'transition-all duration-200 ease-in-out ' +
    'disabled:pointer-events-none disabled:opacity-50';

export const SidebarActionButton = forwardRef<
    HTMLButtonElement,
    SidebarActionButtonProps
>(
    (
        {
            className,
            leftIcon,
            rightIcon,
            collapsed = false,
            variant = 'ghost',
            size = 'sm',
            isLoading = false,
            disabled,
            type,
            children,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                type={type ?? 'button'}
                disabled={isDisabled}
                aria-busy={isLoading || undefined}
                style={
                    {
                        '--collapsed-w': '2.5rem',
                        '--px-x': '0.75rem',
                        '--gap-x': '0.5rem',
                        '--icon-slot-w':
                            'calc(var(--collapsed-w) - (var(--px-x) * 2))',
                    } as CSSProperties
                }
                className={cn(
                    base,
                    sizes[size],
                    variants[variant],
                    'px-(--px-x)',
                    className,
                )}
                {...props}
            >
                {isLoading ? (
                    <Spinner />
                ) : (
                    <span
                        className={cn(
                            'flex shrink-0 items-center justify-center w-(--icon-slot-w)',
                        )}
                    >
                        {leftIcon}
                    </span>
                )}

                <span
                    className={cn(
                        'ml-(--gap-x) flex min-w-0 flex-1 items-center justify-between overflow-hidden whitespace-nowrap origin-left transition-all duration-200 ease-in-out',
                        collapsed
                            ? 'scale-x-0 opacity-0'
                            : 'scale-x-100 opacity-100',
                    )}
                    aria-hidden={collapsed || undefined}
                >
                    <span className="truncate">{children}</span>

                    {rightIcon ? (
                        <span className="ml-2 shrink-0">{rightIcon}</span>
                    ) : null}
                </span>
            </button>
        );
    },
);

SidebarActionButton.displayName = 'SidebarActionButton';
