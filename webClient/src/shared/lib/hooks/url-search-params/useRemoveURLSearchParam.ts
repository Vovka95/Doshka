import { useSearchParams } from "react-router-dom";

export const useRemoveURLSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const removeSearchParam = (param: string) => {
        const next = new URLSearchParams(searchParams);
        next.delete(param);
        setSearchParams(next, { replace: true });
    };

    return removeSearchParam;
};
