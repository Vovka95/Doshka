import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { FormField, Input } from "@/shared/ui";
import { AuthForm } from "../auth-form";

import {
    resetPasswordSchema,
    useResetPasswordMutation,
    type ResetPasswordValues,
} from "../../model";

import { routes } from "@/app/config/routes";
import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";
import { t } from "@/shared/lib/i18n";
import { translateFormFieldError } from "@/shared/lib/forms/translateFormFieldError";

export type ResetPasswordFormProps = {
    token: string;
    onSuccess: () => void;
};

export const ResetPasswordForm = ({
    token,
    onSuccess,
}: ResetPasswordFormProps) => {
    const navigate = useNavigate();
    const toast = useUIStore((s) => s.toast);
    const resetPasswordMutation = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: ResetPasswordValues) => {
        try {
            clearErrors("root");

            const dto = { token, ...values };
            const response = await resetPasswordMutation.mutateAsync(dto);

            onSuccess();

            toast({
                variant: "success",
                title: t("auth.resetPassword.toast.success.title"),
                message: response.message,
            });

            navigate(routes.login(), { replace: true });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.resetPassword.toast.error.title"),
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
                title: t("auth.resetPassword.form.button.submit"),
                disabled: resetPasswordMutation.isPending || isSubmitting,
                isLoading: resetPasswordMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label={t("auth.resetPassword.form.input.password.label")}
                htmlFor="password"
                required
                error={translateFormFieldError(errors.password)}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t(
                        "auth.resetPassword.form.input.password.placeholder",
                    )}
                    {...register("password")}
                    hasError={!!errors.password}
                />
            </FormField>
            <FormField
                label={t("auth.resetPassword.form.input.confirmPassword.label")}
                htmlFor="confirm-password"
                required
                error={translateFormFieldError(errors.confirmPassword)}
            >
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder={t(
                        "auth.resetPassword.form.input.confirmPassword.placeholder",
                    )}
                    {...register("confirmPassword")}
                    hasError={!!errors.confirmPassword}
                />
            </FormField>
        </AuthForm>
    );
};
