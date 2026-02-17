import { cn } from "@/shared/lib/cn";
import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";

type StyledNavLinkProps = NavLinkProps & {
    icon?: ReactNode;
    badge?: ReactNode;
    collapsed?: boolean;
    variant?: "sidebar" | "default";
    children: ReactNode;
};

export const StyledNavLink = ({
    icon,
    badge,
    collapsed = false,
    variant = "sidebar",
    className,
    children,
    ...props
}: StyledNavLinkProps) => {
    return (
        <NavLink
            {...props}
            className={({ isActive, isPending }) =>
                cn(
                    baseStyles,
                    variantStyles[variant],
                    isActive && activeStyles[variant],
                    isPending && "opacity-70",
                    typeof className === "function"
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
                                "flex shrink-0 items-center justify-center",
                                isActive && "text-fg",
                            )}
                        >
                            {icon}
                        </span>
                    )}

                    <span
                        className={cn(
                            "flex min-w-0 flex-1 items-center justify-between gap-2",
                            collapsed &&
                                "w-0 flex-none overflow-hidden opacity-0",
                        )}
                        aria-hidden={collapsed || undefined}
                    >
                        <span className="truncate">{children}</span>
                        <span
                            className={cn(
                                "ml-2 shrink-0 text-xs text-muted-fg",
                                badge == null && "hidden",
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

const baseStyles =
    "group flex items-center gap-2 rounded-md px-3 py-2 text-md transition-colors";

const variantStyles = {
    default: "hover:bg-hover text-fg",
    sidebar: "text-muted-fg hover:bg-hover my-0.5",
};

const activeStyles = {
    default: "bg-selected text-fg font-medium",
    sidebar: "bg-selected text-fg font-medium",
};
