import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField, Input } from "@/shared/ui";
import { AuthForm } from "../auth-form";

import {
    signupSchema,
    type SignupValues,
    useSignupMutation,
} from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";
import { t } from "@/shared/lib/i18n";
import { translateFormFieldError } from "@/shared/lib/forms/translateFormFieldError";

export type SignupFormProps = {
    onSuccess: (email: string) => void;
};

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
    const toast = useUIStore((s) => s.toast);
    const signupMutation = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = async (values: SignupValues) => {
        try {
            clearErrors("root");

            const response = await signupMutation.mutateAsync(values);

            onSuccess(values.email);

            toast({
                variant: "success",
                title: t("auth.signup.toast.success.title"),
                message: response.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.signup.toast.error.title"),
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
                title: t("auth.signup.form.button.submit"),
                disabled: signupMutation.isPending || isSubmitting,
                isLoading: signupMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label={t("auth.signup.form.input.firstName.label")}
                htmlFor="firstName"
                required
                error={translateFormFieldError(errors.firstName)}
            >
                <Input
                    id="firstName"
                    placeholder={t(
                        "auth.signup.form.input.firstName.placeholder",
                    )}
                    {...register("firstName")}
                    hasError={!!errors.firstName}
                />
            </FormField>

            <FormField
                label={t("auth.signup.form.input.lastName.label")}
                htmlFor="lastName"
                required
                error={translateFormFieldError(errors.lastName)}
            >
                <Input
                    id="lastName"
                    placeholder={t(
                        "auth.signup.form.input.lastName.placeholder",
                    )}
                    {...register("lastName")}
                    hasError={!!errors.lastName}
                />
            </FormField>

            <FormField
                label={t("auth.signup.form.input.email.label")}
                htmlFor="email"
                required
                error={translateFormFieldError(errors.email)}
            >
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("auth.signup.form.input.email.placeholder")}
                    {...register("email")}
                    hasError={!!errors.email}
                />
            </FormField>

            <FormField
                label={t("auth.signup.form.input.password.label")}
                htmlFor="password"
                required
                error={translateFormFieldError(errors.password)}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder={t(
                        "auth.signup.form.input.password.placeholder",
                    )}
                    {...register("password")}
                    hasError={!!errors.password}
                />
            </FormField>

            <FormField
                label={t("auth.signup.form.input.confirmPassword.label")}
                htmlFor="confirmPassword"
                required
                error={translateFormFieldError(errors.confirmPassword)}
            >
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t(
                        "auth.signup.form.input.confirmPassword.placeholder",
                    )}
                    {...register("confirmPassword")}
                    hasError={!!errors.confirmPassword}
                />
            </FormField>
        </AuthForm>
    );
};
