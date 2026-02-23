import { ResendConfirmationEmail } from "./ResendConfirmationEmail";

export type SignupSuccessProps = {
    email: string;
};

export const SignupSuccess = ({ email }: SignupSuccessProps) => {
    return (
        <div className="grid gap-4">
            <p className="font-medium text-sm text-fg text-center">
                Confirmation sent to: {email}
            </p>

            <ResendConfirmationEmail email={email} />
        </div>
    );
};
