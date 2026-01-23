import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ExpiresIn } from '../interfaces/expires-in.type';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const generateTokens = async (
  jwtService: JwtService,
  configService: ConfigService,
  payload: JwtPayload,
) => {
  const accessToken = await jwtService.signAsync(payload, {
    secret: configService.get<string>('JWT_SECRET'),
    expiresIn: configService.get<ExpiresIn>('JWT_EXPIRES_IN'),
  });

  const refreshToken = await jwtService.signAsync(
    { sub: payload.sub },
    {
      secret: configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: configService.get<ExpiresIn>('JWT_REFRESH_EXPIRES_IN'),
    },
  );

  return { accessToken, refreshToken };
};
