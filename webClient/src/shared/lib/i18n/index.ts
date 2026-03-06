/* eslint-disable @typescript-eslint/no-explicit-any */

import { en } from './en';
import type { DotPaths, PathValue } from './types';

const dictionary = { en } as const;

type Locale = keyof typeof dictionary;
type Dict = (typeof dictionary)['en'];
export type TKey = DotPaths<Dict>;

let currentLocale: Locale = 'en';
export const setLocale = (locale: Locale) => {
    currentLocale = locale;
};

const resolvePath = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const interpolate = (
    template: string,
    vars?: Record<string, string | number>,
) => {
    if (!vars) return template;
    return template.replace(/{{(.*?)}}/g, (_, rawKey) => {
        const key = String(rawKey).trim();
        const val = vars[key];
        return val === undefined ? `{{${key}}}` : String(val);
    });
};

export const t = <K extends TKey>(
    key: K,
    vars?: Record<string, string | number>,
): PathValue<Dict, K> extends string ? string : never => {
    const template = resolvePath(dictionary[currentLocale], key as string);

    if (typeof template !== 'string') {
        console.warn(`Missing or non-string translation: ${String(key)}`);
        return key as any;
    }

    return interpolate(template, vars) as any;
};

export const tUnsafe = (
    key: string,
    vars?: Record<string, string | number>,
): string => {
    const template = resolvePath(dictionary[currentLocale], key);

    if (typeof template !== 'string') {
        return vars ? interpolate(key, vars) : key; // no warn for dynamic strings
    }

    return interpolate(template, vars);
};
