import { useId, type HTMLAttributes, type LabelHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

import { cn } from "@/shared/lib/cn";

export type FormFieldProps = {
    label: string;
    htmlFor?: string;
    hintText?: string;
    error?: FieldError;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
};

export const FormField = ({
    label,
    htmlFor,
    hintText,
    error,
    required,
    children,
    className,
}: FormFieldProps) => {
    const describedById = useId();
    const errorId = useId();

    return (
        <FormFieldRoot className={cn("", className)}>
            <FormLabel htmlFor={htmlFor} required={required}>
                {label}
            </FormLabel>

            {children}

            {error ? (
                <FormMessage id={errorId} error={error} />
            ) : hintText ? (
                <FormHint id={describedById}>{hintText}</FormHint>
            ) : null}
        </FormFieldRoot>
    );
};

export const FormFieldRoot = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("grid gap-2", className)} {...props} />;
};

export const FormLabel = ({
    className,
    required,
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
}) => {
    return (
        <label
            className={cn("text-sm font-medium text-fg", className)}
            {...props}
        >
            {children}{" "}
            {required ? <span className="text-danger">*</span> : null}{" "}
        </label>
    );
};

export const FormMessage = ({
    error,
    className,
}: {
    error?: FieldError;
    className?: string;
    id?: string;
}) => {
    if (!error?.message) return null;
    return (
        <p className={cn("text-xs text-danger", className)}>
            {String(error.message)}
        </p>
    );
};

export const FormHint = ({
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
    return <p className={cn("text-xs text-muted-fg", className)} {...props} />;
};
