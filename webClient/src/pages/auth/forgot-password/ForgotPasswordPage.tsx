import { useState } from "react";

import { ForgotPasswordForm, ForgotPasswordSuccess } from "@/features/auth/ui";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

import { routes } from "@/app/config/routes";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    const isSuccess = !!email;

    return (
        <AuthCard
            title={isSuccess ? "Check your email" : "Forgot your password?"}
            description={
                isSuccess
                    ? "If an account exists for this email, we've sent a reset link."
                    : "Enter your email and we'll send you a link to reset your password."
            }
            footer={
                isSuccess ? (
                    <AuthRedirect
                        question="Already reset your password?"
                        linkText="Back to login"
                        to={routes.login()}
                    />
                ) : (
                    <AuthRedirect
                        question="Remember your password?"
                        linkText="Back to login"
                        to={routes.login()}
                    />
                )
            }
        >
            {isSuccess ? (
                <ForgotPasswordSuccess email={email} />
            ) : (
                <ForgotPasswordForm onSuccess={setEmail} />
            )}
        </AuthCard>
    );
};
