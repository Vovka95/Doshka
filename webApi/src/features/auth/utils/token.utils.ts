import { JwtService } from '@nestjs/jwt';
import { ExpiresIn } from '../interfaces/expires-in.type';

export async function generateTokens(
  jwtService: JwtService,
  payload: { userId: string; email: string },
  accessTokenExpiresIn: ExpiresIn,
  refreshTokenExpiresIn: ExpiresIn,
) {
  const [accessToken, refreshToken] = await Promise.all([
    jwtService.signAsync(payload, { expiresIn: accessTokenExpiresIn }),
    jwtService.signAsync(payload, { expiresIn: refreshTokenExpiresIn }),
  ]);

  return { accessToken, refreshToken };
}
