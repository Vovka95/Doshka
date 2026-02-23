import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, FormError, FormField, Input } from "@/shared/ui";

import { loginSchema, useLoginMutation, type LoginValues } from "../../model";

import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";

export type LoginFormProps = {
    onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const toast = useUIStore((s) => s.toast);
    const loginMutation = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        setError,
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
            const response = await loginMutation.mutateAsync(values);

            toast({
                variant: "success",
                title: "Signed in successfully",
                message: "Welcome back to Doshka.",
            });

            onSuccess();
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Login failed",
                message: apiError.message,
            });

            setError("root", { type: "server", message: apiError.message });
        }
    };

    return (
        <form
            className="grid gap-4"
            autoComplete="on"
            onSubmit={handleSubmit(onSubmit)}
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
            <FormField
                label="Password"
                htmlFor="password"
                required
                error={errors.password}
            >
                <Input
                    id="password"
                    type="password"
                    autoComplete="password"
                    placeholder="••••••••"
                    {...register("password")}
                    hasError={!!errors.password}
                />
            </FormField>

            <Button
                size="lg"
                type="submit"
                disabled={loginMutation.isPending || loginMutation.isSuccess}
                isLoading={isLoading || loginMutation.isPending}
            >
                Log in to your account
            </Button>

            {errors.root?.message && (
                <FormError message={errors.root.message} />
            )}
        </form>
    );
};
