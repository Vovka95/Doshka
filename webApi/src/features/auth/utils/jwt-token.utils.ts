import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../interfaces/jwt-payload.interface';
import { ExpiresIn } from '../types/expires-in.type';
import { AuthTokens } from '../types/auth-tokens.type';

export const generateJwtTokens = async (
  jwtService: JwtService,
  configService: ConfigService,
  payload: AccessTokenPayload,
): Promise<AuthTokens> => {
  const accessTokenSecret = configService.get<string>('JWT_SECRET');
  const accessTokenExpiresIn = configService.get<ExpiresIn>('JWT_EXPIRES_IN');

  const refreshTokenSecret = configService.get<string>('JWT_REFRESH_SECRET');
  const refreshTokenExpiresIn = configService.get<ExpiresIn>(
    'JWT_REFRESH_EXPIRES_IN',
  );

  const accessToken = await jwtService.signAsync(payload, {
    secret: accessTokenSecret,
    expiresIn: accessTokenExpiresIn,
  });

  const refreshPayload: RefreshTokenPayload = {
    sub: payload.sub,
  };

  const refreshToken = await jwtService.signAsync(refreshPayload, {
    secret: refreshTokenSecret,
    expiresIn: refreshTokenExpiresIn,
    jwtid: randomUUID(),
  });

  return { accessToken, refreshToken };
};
