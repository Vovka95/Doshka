import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField, Input } from "@/shared/ui";
import { AuthForm } from "../auth-form";

import {
    forgotPasswordSchema,
    useForgotPasswordMutation,
    type ForgotPasswordValues,
} from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";

export type ForgotPasswordFormProps = {
    onSuccess: (email: string) => void;
};

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
    const toast = useUIStore((s) => s.toast);
    const forgotPasswordMutation = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: ForgotPasswordValues) => {
        try {
            clearErrors("root");

            const data = await forgotPasswordMutation.mutateAsync(values);

            onSuccess(values.email);

            toast({
                variant: "success",
                title: "Check your email",
                message: data.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Request failed",
                message: apiError.messages[0],
            });

            setError("root", {
                type: "server",
                message: apiError.messages.join("\n"),
            });
        }
    };

    return (
        <AuthForm
            onSubmit={handleSubmit(onSubmit)}
            submitButton={{
                title: "Send reset link",
                disabled: forgotPasswordMutation.isPending || isSubmitting,
                isLoading: forgotPasswordMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label="Email"
                htmlFor="email"
                required
                error={errors.email}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="test@test.com"
                    {...register("email")}
                    hasError={!!errors.email}
                />
            </FormField>
        </AuthForm>
    );
};
