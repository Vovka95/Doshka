import { Button } from "@/shared/ui";
import { useResendConfirmationMutation } from "../../model";
import { useCooldown } from "@/shared/lib/hooks/cooldown";
import { useUIStore } from "@/shared/store/ui";
import { normalizeApiError } from "@/shared/api/http/errror";

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
                title: "Confiramtion email sent again",
                message: response.message,
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: "error",
                title: "Failed to resend email",
                message: apiError.message,
            });
        }
    };

    return (
        <Button
            onClick={handleOnClick}
            disabled={
                resendConfirmationMutation.isPending || cooldown.isCoolingDown
            }
        >
            {resendConfirmationMutation.isPending
                ? "Sending..."
                : cooldown.secondsLeft > 0
                  ? `Resend available in ${cooldown.secondsLeft}s`
                  : "Resend email"}
        </Button>
    );
};
