import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, hasError, ...props },
    ref,
) {
    return (
        <input
            ref={ref}
            className={cn(
                "h-10 w-full rounded-md border bg-transparent px-3 text-sm outline-none",
                "border-border text-fg placeholder:text-muted-fg",
                "focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                hasError && "border-danger focus-visible:ring-danger",
                className,
            )}
            {...props}
        />
    );
});
Input.displayName = "Input";
