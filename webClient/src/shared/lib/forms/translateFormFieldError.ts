import type { FieldError } from 'react-hook-form';
import { tUnsafe } from '../i18n';
import type { ZodI18nMessage } from './zodMessage';

export const translateFormFieldError = (error: FieldError | undefined) => {
    if (!error?.message) return error;

    const raw = String(error.message);

    try {
        const parsed = JSON.parse(raw) as Partial<ZodI18nMessage>;

        if (parsed && typeof parsed.key === 'string') {
            return {
                ...error,
                message: tUnsafe(parsed.key, parsed.params),
            };
        }
    } catch (error) {
        console.error(error);
    }

    return {
        ...error,
        message: tUnsafe(raw),
    };
};
