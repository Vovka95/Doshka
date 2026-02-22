import { ResendConfirmationEmail } from "./ResendConfirmationEmail";

export type SignupSuccessProps = {
    email: string;
};

export const SignupSuccess = ({ email }: SignupSuccessProps) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="font-medium text-sm text-fg">{email}</p>

            <ResendConfirmationEmail email={email} />
        </div>
    );
};
