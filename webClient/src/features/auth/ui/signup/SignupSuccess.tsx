import { ResendConfirmationEmail } from "./ResendConfirmationEmail";

import { t } from "@/shared/lib/i18n";

export type SignupSuccessProps = {
    email: string;
};

export const SignupSuccess = ({ email }: SignupSuccessProps) => {
    return (
        <div className="grid gap-4">
            <p className="font-medium text-sm text-fg text-center">
                {t("auth.signup.state.success.sentTo", { email })}
            </p>

            <ResendConfirmationEmail email={email} />
        </div>
    );
};
