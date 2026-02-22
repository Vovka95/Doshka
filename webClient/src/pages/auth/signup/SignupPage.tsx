import { useState } from "react";
import { Link } from "react-router-dom";

import { SignupForm, SignupSuccess } from "@/features/auth/ui";
import { AuthCard } from "@/widgets/auth";

import { routes } from "@/app/config/routes";

export const SignupPage = () => {
    const [email, setEmail] = useState<string | null>(null);

    const isSuccess = !!email;

    return (
        <AuthCard
            title={isSuccess ? "Check your email" : "Create your account"}
            description={
                isSuccess
                    ? "We sent you a verification link."
                    : "Sign up to start using Doshka."
            }
            footer={
                isSuccess ? (
                    <Link
                        className="text-sm underline hover:opacity-80"
                        to={routes.login()}
                    >
                        Back to login
                    </Link>
                ) : (
                    <>
                        <span className="text-sm text-muted-fg">
                            Already have an account?
                        </span>
                        <Link
                            className="text-sm underline hover:opacity-80"
                            to={routes.login()}
                        >
                            Log in
                        </Link>
                    </>
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
