import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

export const Card = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-card text-card-fg shadow-sm",
                className,
            )}
            {...props}
        />
    );
};

export const CardHeader = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("px-6 pt-6 pb-3", className)} {...props} />;
};

export const CardTitle = ({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3
            className={cn("text-lg font-semibold leading-none", className)}
            {...props}
        />
    );
};

export const CardDescription = ({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
    return <p className="mt-1 text-sm text-muted-fg" {...props} />;
};

export const CardContent = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("px-6 pb-6", className)} {...props} />;
};

export const CardFooter = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "px-6 pb-6 pt-0 flex items-center justify-between gap-3",
                className,
            )}
            {...props}
        />
    );
};
