import { Link } from "react-router-dom";

import { SignupForm } from "@/features/auth/ui";
import { AuthCard } from "@/widgets/auth";

import { routes } from "@/app/config/routes";

export const SignupPage = () => {
    return (
        <AuthCard
            title="Create your account"
            description="Sign up to start using Doshka."
            footer={
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
            }
        >
            <SignupForm />
        </AuthCard>
    );
};
