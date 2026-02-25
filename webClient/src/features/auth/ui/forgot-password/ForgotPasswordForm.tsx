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
import { t } from "@/shared/lib/i18n";
import { translateFormFieldError } from "@/shared/lib/forms/translateFormFieldError";

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
                title: t("auth.forgotPassword.toast.success.title"),
                message: data.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.forgotPassword.toast.error.title"),
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
                title: t("auth.forgotPassword.form.button.submit"),
                disabled: forgotPasswordMutation.isPending || isSubmitting,
                isLoading: forgotPasswordMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label={t("auth.forgotPassword.form.input.email.label")}
                htmlFor="email"
                required
                error={translateFormFieldError(errors.email)}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t(
                        "auth.forgotPassword.form.input.email.placeholder",
                    )}
                    {...register("email")}
                    hasError={!!errors.email}
                />
            </FormField>
        </AuthForm>
    );
};
