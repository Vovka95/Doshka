import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui";

export type AuthCardProps = {
    title?: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
    className?: string;
};

export const AuthCard = ({
    title,
    description,
    footer,
    children,
    className,
}: AuthCardProps) => {
    return (
        <Card className={cn("w-full max-w-md", className)}>
            <CardHeader className="items-center">
                {title && <CardTitle>{title}</CardTitle>}
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};
