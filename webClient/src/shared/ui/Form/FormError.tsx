import { cn } from "@/shared/lib/cn";

type FormErrorProps = {
    message: string;
    className?: string;
};

export const FormError = ({ message, className }: FormErrorProps) => {
    return (
        <div
            className={cn(
                "rounded-md border border-danger bg-danger/10 px-3 py-2 text-sm text-danger",
                className,
            )}
        >
            {message}
        </div>
    );
};
