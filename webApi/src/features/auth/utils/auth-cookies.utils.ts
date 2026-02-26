import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

const REFRESH_COOKIE = 'refresh_token';

export const setRefreshCookie = (
  res: Response,
  token: string,
  configService: ConfigService,
) => {
  const isProd = configService.get('NODE_ENV') === 'production';

  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshCookie = (
  res: Response,
  configService: ConfigService,
) => {
  const isProd = configService.get('NODE_ENV') === 'production';

  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/api/auth/refresh',
  });
};

export const getRefreshCookie = (req: Request) =>
  req.cookies?.[REFRESH_COOKIE] as string | undefined;
