import { useSearchParams } from "react-router-dom";

export const useReadURLSearchParam = (paramName: string) => {
    const [searchParams] = useSearchParams();
    const paramValue = searchParams.get(paramName) ?? "";

    return paramValue;
};
