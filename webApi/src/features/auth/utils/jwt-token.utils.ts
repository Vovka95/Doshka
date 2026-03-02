import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

import {
  AccessTokenPayload,
  RefreshTokenPayload,
  JwtTokensPayload,
} from '../interfaces/jwt-payload.interface';
import { ExpiresIn } from '../types/expires-in.type';
import { JwtTokensResult } from '../types/jwt-tokens-result.type';

export const generateJwtTokens = async (
  jwtService: JwtService,
  configService: ConfigService,
  payload: JwtTokensPayload,
): Promise<JwtTokensResult> => {
  const accessTokenSecret = configService.get<string>('JWT_SECRET');
  const accessTokenExpiresIn = configService.get<ExpiresIn>('JWT_EXPIRES_IN');

  const refreshTokenSecret = configService.get<string>('JWT_REFRESH_SECRET');
  const refreshTokenExpiresIn = configService.get<ExpiresIn>(
    'JWT_REFRESH_EXPIRES_IN',
  );

  const accessPayload: AccessTokenPayload = {
    sub: payload.sub,
  };

  const sessionId = payload.sid ?? randomUUID();

  const refreshPayload: RefreshTokenPayload = {
    sub: payload.sub,
    sid: sessionId,
  };

  const accessToken = await jwtService.signAsync(accessPayload, {
    secret: accessTokenSecret,
    expiresIn: accessTokenExpiresIn,
  });

  const refreshToken = await jwtService.signAsync(refreshPayload, {
    secret: refreshTokenSecret,
    expiresIn: refreshTokenExpiresIn,
    jwtid: randomUUID(),
  });

  return { accessToken, refreshToken, sid: sessionId };
};
