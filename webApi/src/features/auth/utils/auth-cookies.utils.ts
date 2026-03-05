import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

import { getRefreshMaxAge } from './refresh-age.utils';
import {
  getCookieDomainEnv,
  getCookieSecureEnv,
  getIsProdEnv,
} from './node-env.utils';

const REFRESH_COOKIE = 'refresh_token';

export const setRefreshCookie = (
  res: Response,
  token: string,
  configService: ConfigService,
) => {
  const isProd = getIsProdEnv(configService);
  const refreshMaxAge = getRefreshMaxAge(configService);
  const cookieDomain = getCookieDomainEnv(configService);
  const cookieSecure = getCookieSecureEnv(configService);

  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
    domain: isProd ? cookieDomain : undefined,
    maxAge: refreshMaxAge,
  });
};

export const clearRefreshCookie = (
  res: Response,
  configService: ConfigService,
) => {
  const isProd = getIsProdEnv(configService);
  const cookieDomain = getCookieDomainEnv(configService);
  const cookieSecure = getCookieSecureEnv(configService);

  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
    domain: isProd ? cookieDomain : undefined,
  });
};

export const getRefreshCookie = (req: Request) =>
  req.cookies?.[REFRESH_COOKIE] as string | undefined;
