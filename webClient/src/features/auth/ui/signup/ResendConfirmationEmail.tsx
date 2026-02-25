import { Button } from "@/shared/ui";
import { useResendConfirmationMutation } from "../../model";
import { useCooldown } from "@/shared/lib/hooks/cooldown";
import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";
import { t } from "@/shared/lib/i18n";

const RESEND_COOLDOWN_SEC = 60;

export type ResendConfirmationEmailProps = {
    email: string;
};

export const ResendConfirmationEmail = ({
    email,
}: ResendConfirmationEmailProps) => {
    const resendConfirmationMutation = useResendConfirmationMutation();
    const cooldown = useCooldown(RESEND_COOLDOWN_SEC, { autoStart: true });
    const toast = useUIStore((s) => s.toast);

    const handleOnClick = async () => {
        if (resendConfirmationMutation.isPending || !cooldown.canRun) return;

        try {
            const response = await resendConfirmationMutation.mutateAsync({
                email,
            });

            cooldown.start(RESEND_COOLDOWN_SEC);

            toast({
                variant: "success",
                title: t("auth.resendConfirmationEmail.toast.success.title"),
                message: response.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: t("auth.resendConfirmationEmail.toast.error.title"),
                message: apiError.messages[0],
            });
        }
    };

    return (
        <Button
            onClick={handleOnClick}
            disabled={
                resendConfirmationMutation.isPending || cooldown.isCoolingDown
            }
            isLoading={resendConfirmationMutation.isPending}
        >
            {cooldown.isCoolingDown
                ? t("auth.resendConfirmationEmail.button.cooldown", {
                      seconds: cooldown.secondsLeft,
                  })
                : t("auth.resendConfirmationEmail.button.idle")}
        </Button>
    );
};
