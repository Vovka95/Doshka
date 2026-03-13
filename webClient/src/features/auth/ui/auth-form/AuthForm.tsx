import { cn } from '@/shared/lib/cn';
import { Button, FormError } from '@/shared/ui';
import type { FormEventHandler, ReactNode } from 'react';

export type AuthFormProps = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
    submitButton: {
        title: ReactNode;
        isLoading?: boolean;
        disabled?: boolean;
    };
    errorMessage?: string;
    autoComplete?: 'on' | 'off';
    className?: string;
};

export const AuthForm = ({
    onSubmit,
    children,
    submitButton: { title, disabled, isLoading },
    errorMessage,
    autoComplete = 'on',
    className,
}: AuthFormProps) => {
    return (
        <form
            className={cn(['grid gap-4', className])}
            autoComplete={autoComplete}
            onSubmit={onSubmit}
        >
            {children}
            <Button
                size="md"
                type="submit"
                disabled={disabled}
                isLoading={isLoading}
            >
                {title}
            </Button>

            {errorMessage && <FormError message={errorMessage} />}
        </form>
    );
};
