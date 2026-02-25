export type ForgotPasswordSuccessProps = {
    email: string;
};

export const ForgotPasswordSuccess = ({
    email,
}: ForgotPasswordSuccessProps) => {
    return (
        <div className="grid gap-4">
            <p className="font-medium text-sm text-fg text-center">
                Confirmation sent to: {email}
            </p>
        </div>
    );
};
