import { routes } from "@/app/config/routes";

import { LoginForm } from "@/features/auth/ui";
import { AuthCard, AuthRedirect } from "@/widgets/auth";

export const LoginPage = () => {
    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to continue to Doshka"
            footer={
                <>
                    <AuthRedirect
                        question="Trouble signing in?"
                        linkText="Forgot password?"
                        to={routes.forgotPassword()}
                    />

                    <AuthRedirect
                        question="Don't have an account?"
                        linkText="Sign up"
                        to={routes.signup()}
                    />
                </>
            }
        >
            <LoginForm onSuccess={() => {}} />
        </AuthCard>
    );
};
