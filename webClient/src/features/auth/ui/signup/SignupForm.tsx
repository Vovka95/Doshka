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
                title: "Account created",
                message: response.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Signup failed",
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
                title: "Create account",
                disabled: signupMutation.isPending || isSubmitting,
                isLoading: signupMutation.isPending || isSubmitting,
            }}
            errorMessage={errors.root?.message}
        >
            <FormField
                label="First name"
                htmlFor="firstName"
                required
                error={errors.firstName}
            >
                <Input
                    id="first-name"
                    placeholder="Your name"
                    {...register("firstName")}
                    hasError={!!errors.firstName}
                />
            </FormField>

            <FormField
                label="Last name"
                htmlFor="lastName"
                required
                error={errors.lastName}
            >
                <Input
                    id="last-name"
                    placeholder="Your last name"
                    {...register("lastName")}
                    hasError={!!errors.lastName}
                />
            </FormField>

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

            <FormField
                label="Password"
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
