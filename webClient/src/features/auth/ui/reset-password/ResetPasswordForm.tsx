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
                title: "Password updated",
                message: response.message,
            });

            navigate(routes.login(), { replace: true });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Reset failed",
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
                title: "Reset password",
                disabled: resetPasswordMutation.isPending || isSubmitting,
                isLoading: resetPasswordMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label="New password"
                htmlFor="password"
                required
                error={errors.password}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...register("password")}
                    hasError={!!errors.password}
                />
            </FormField>
            <FormField
                label="Confirm password"
                htmlFor="confirm-password"
                required
                error={errors.confirmPassword}
            >
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    hasError={!!errors.confirmPassword}
                />
            </FormField>
        </AuthForm>
    );
};
