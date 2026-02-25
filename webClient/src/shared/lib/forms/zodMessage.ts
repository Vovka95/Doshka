export type ZodI18nMessage = {
    key: string;
    params?: Record<string, string | number>;
};

export const zodMessage = (
    key: string,
    params?: Record<string, string | number>,
): string => {
    const payload: ZodI18nMessage = params ? { key, params } : { key };
    return JSON.stringify(payload);
};
