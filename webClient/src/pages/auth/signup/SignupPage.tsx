import { useState } from "react";

import { SignupForm, SignupSuccess } from "@/features/auth/ui";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

import { routes } from "@/app/config/routes";

export const SignupPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    const isSuccess = !!email;

    return (
        <AuthCard
            title={isSuccess ? "Check your email" : "Create your account"}
            description={
                isSuccess
                    ? "We've sent a confirmation link to your email address. Please verify your account to continue."
                    : "Sign up to start using Doshka."
            }
            footer={
                isSuccess ? (
                    <AuthRedirect
                        question="Already confirmed your email?"
                        linkText="Back to login"
                        to={routes.login()}
                    />
                ) : (
                    <AuthRedirect
                        question="Already have an account?"
                        linkText="Log in"
                        to={routes.login()}
                    />
                )
            }
        >
            {isSuccess ? (
                <SignupSuccess email={email} />
            ) : (
                <SignupForm onSuccess={setEmail} />
            )}
        </AuthCard>
    );
};
