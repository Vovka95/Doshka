import { ConfigService } from '@nestjs/config';

export const getIsProdEnv = (configService: ConfigService) =>
  configService.get('NODE_ENV') === 'production';

export const getCookieDomainEnv = (configService: ConfigService) =>
  configService.get('COOKIE_DOMAIN');

export const getCookieSecureEnv = (configService: ConfigService) =>
  configService.get('COOKIE_SECURE');
