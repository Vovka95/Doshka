import { useSearchParams } from "react-router-dom";

import { ConfirmEmail } from "@/features/auth/ui";

export const ConfirmEmailPage = () => {
    const [params] = useSearchParams();
    const token = params.get("token") ?? "";

    return <ConfirmEmail token={token} />;
};
