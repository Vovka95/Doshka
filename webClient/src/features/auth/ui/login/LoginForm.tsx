import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField, Input } from "@/shared/ui";
import { AuthForm } from "../auth-form";

import { loginSchema, useLoginMutation, type LoginValues } from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";
import { useQueryClient } from "@tanstack/react-query";
import { authSession } from "../../lib/authSession";
import { t } from "@/shared/lib/i18n";
import { translateFormFieldError } from "@/shared/lib/forms/translateFormFieldError";

export const LoginForm = () => {
    const queryClient = useQueryClient();
    const toast = useUIStore((s) => s.toast);
    const loginMutation = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (values: LoginValues) => {
        try {
            clearErrors("root");

            const response = await loginMutation.mutateAsync(values);

            authSession.apply(queryClient, response);

            toast({
                variant: "success",
                title: t("auth.login.toast.success.title"),
                message: t("auth.login.toast.success.message"),
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.login.toast.error.title"),
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
                title: t("auth.login.form.button.submit"),
                disabled:
                    loginMutation.isPending ||
                    loginMutation.isSuccess ||
                    isSubmitting,
                isLoading: loginMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label={t("auth.login.form.input.email.label")}
                htmlFor="email"
                required
                error={translateFormFieldError(errors.email)}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("auth.login.form.input.email.placeholder")}
                    {...register("email")}
                    hasError={!!errors.email}
                />
            </FormField>
            <FormField
                label={t("auth.login.form.input.password.label")}
                htmlFor="password"
                required
                error={translateFormFieldError(errors.password)}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="password"
                    placeholder={t(
                        "auth.login.form.input.password.placeholder",
                    )}
                    {...register("password")}
                    hasError={!!errors.password}
                />
            </FormField>
        </AuthForm>
    );
};
