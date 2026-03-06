import { ConfigService } from '@nestjs/config';

export const getIsProdEnv = (configService: ConfigService): boolean =>
    configService.getOrThrow('NODE_ENV') === 'production';

export const getCookieDomainEnv = (configService: ConfigService): string =>
    configService.getOrThrow('COOKIE_DOMAIN');

export const getCookieSecureEnv = (configService: ConfigService): boolean =>
    configService.getOrThrow('COOKIE_SECURE');
