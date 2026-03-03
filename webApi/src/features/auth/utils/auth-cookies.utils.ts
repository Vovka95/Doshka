import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

import { getRefreshMaxAge } from './refresh-age.utils';
import { getIsProdEnv } from './node-env.utils';

const REFRESH_COOKIE = 'refresh_token';

export const setRefreshCookie = (
  res: Response,
  token: string,
  configService: ConfigService,
) => {
  const isProd = getIsProdEnv(configService);
  const refreshMaxAge = getRefreshMaxAge(configService);

  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
    maxAge: refreshMaxAge,
  });
};

export const clearRefreshCookie = (
  res: Response,
  configService: ConfigService,
) => {
  const isProd = getIsProdEnv(configService);

  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
  });
};

export const getRefreshCookie = (req: Request) =>
  req.cookies?.[REFRESH_COOKIE] as string | undefined;
