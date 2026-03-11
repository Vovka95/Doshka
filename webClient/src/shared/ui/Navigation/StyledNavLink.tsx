import type { ReactNode } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';

import { cn } from '@/shared/lib/cn';

export type NavLinkVariant = 'sidebar' | 'default' | 'menu';
export type NavLinkSize = 'xs' | 'sm' | 'md' | 'lg';

export type StyledNavLinkProps = NavLinkProps & {
    icon?: ReactNode;
    badge?: ReactNode;
    collapsed?: boolean;
    variant?: NavLinkVariant;
    size?: NavLinkSize;
    children: ReactNode;
};

const sizes: Record<NavLinkSize, string> = {
    xs: 'h-7 text-xs rounded-xs',
    sm: 'h-8 text-sm rounded-sm',
    md: 'h-9 text-sm rounded-md',
    lg: 'h-10 text-lg rounded-md',
};

const variants: Record<NavLinkVariant, string> = {
    default: 'hover:bg-hover text-fg',
    sidebar: 'text-muted-fg hover:bg-hover flex w-full',
    menu: 'bg-transparent text-fg hover:bg-hover',
};

const activeVariants: Record<NavLinkVariant, string> = {
    default: 'bg-selected text-fg font-medium',
    sidebar: 'bg-selected text-fg font-medium',
    menu: 'bg-selected text-fg font-medium',
};

const base =
    'flex items-center whitespace-nowrap px-3 transition-all duration-200 ease-in-out';

export const StyledNavLink = ({
    icon,
    badge,
    collapsed = false,
    variant = 'sidebar',
    size = 'sm',
    className,
    children,
    ...props
}: StyledNavLinkProps) => {
    return (
        <NavLink
            {...props}
            className={({ isActive, isPending }) =>
                cn(
                    base,
                    sizes[size],
                    variants[variant],
                    collapsed
                        ? 'justify-center gap-0 px-0'
                        : 'justify-start gap-2 px-3',
                    isActive && activeVariants[variant],
                    isPending && 'opacity-70',
                    typeof className === 'function'
                        ? className({
                              isActive,
                              isPending,
                              isTransitioning: false,
                          })
                        : className,
                )
            }
        >
            {({ isActive }) => (
                <>
                    {icon && (
                        <span
                            className={cn(
                                'flex w-7 shrink-0 items-center justify-center transition-all duration-200 ease-in-ou',
                                isActive && 'text-fg',
                                collapsed && 'w-10',
                            )}
                        >
                            {icon}
                        </span>
                    )}

                    <span
                        className={cn(
                            'flex min-w-0 flex-1 items-center justify-between overflow-hidden whitespace-nowrap origin-left transition-all duration-200 ease-in-out',
                            collapsed
                                ? 'scale-x-0 opacity-0'
                                : 'scale-x-100 opacity-100',
                        )}
                        aria-hidden={collapsed || undefined}
                    >
                        <span className="truncate">{children}</span>
                        <span
                            className={cn(
                                'ml-2 shrink-0 text-xs text-muted-fg transition-opacity duration-200',
                                badge == null && 'hidden',
                            )}
                        >
                            {badge}
                        </span>
                    </span>
                </>
            )}
        </NavLink>
    );
};
