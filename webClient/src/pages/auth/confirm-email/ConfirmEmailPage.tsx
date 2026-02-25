import { ConfirmEmail } from "@/features/auth/ui";
import {
    useReadURLSearchParam,
    useRemoveURLSearchParam,
} from "@/shared/lib/hooks";

const CONFIRM_PAGE_SEARCH_PARAM = "token";

export const ConfirmEmailPage = () => {
    const token = useReadURLSearchParam(CONFIRM_PAGE_SEARCH_PARAM);
    const removeSearchParam = useRemoveURLSearchParam();

    const onSuccess = () => {
        removeSearchParam(CONFIRM_PAGE_SEARCH_PARAM);
    };

    return <ConfirmEmail token={token} onSuccess={onSuccess} />;
};
