import ms, { type StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';

const getMsFromEnv = (config: ConfigService, key: string): number => {
    const raw = config.getOrThrow<string>(key);

    const value = ms(raw as StringValue);

    if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error(
            `Invalid ${key} value: "${raw}". Expected e.g. "7d", "12h", "30m".`,
        );
    }

    return value;
};

export const getRefreshMaxAge = (config: ConfigService) =>
    getMsFromEnv(config, 'JWT_REFRESH_EXPIRES_IN');
