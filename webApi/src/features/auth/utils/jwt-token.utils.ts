import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
  const accessToken = await jwtService.signAsync(payload, {
    secret: configService.get<string>('JWT_SECRET'),
    expiresIn: configService.get<ExpiresIn>('JWT_EXPIRES_IN'),
  });

  const refreshPayload: RefreshTokenPayload = { sub: payload.sub };

  const refreshToken = await jwtService.signAsync(refreshPayload, {
    secret: configService.get<string>('JWT_REFRESH_SECRET'),
    expiresIn: configService.get<ExpiresIn>('JWT_REFRESH_EXPIRES_IN'),
  });

  return { accessToken, refreshToken };
};
