import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

import {
    AccessTokenPayload,
    RefreshTokenPayload,
} from '../interfaces/jwt-payload.interface';
import { ExpiresIn } from '../types/expires-in.type';

export const generateAccessToken = async (
    jwtService: JwtService,
    configService: ConfigService,
    payload: AccessTokenPayload,
) => {
    const secret = configService.get<string>('JWT_SECRET');
    const expiresIn = configService.get<ExpiresIn>('JWT_EXPIRES_IN');

    const token = await jwtService.signAsync(payload, {
        secret,
        expiresIn,
    });

    return token;
};

export const generateRefreshToken = async (
    jwtService: JwtService,
    configService: ConfigService,
    payload: RefreshTokenPayload,
) => {
    const secret = configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = configService.get<ExpiresIn>('JWT_REFRESH_EXPIRES_IN');

    const token = await jwtService.signAsync(payload, {
        secret,
        expiresIn,
        jwtid: randomUUID(),
    });

    return token;
};

export const verifyRefreshToken = async (
    jwtService: JwtService,
    configService: ConfigService,
    refreshToken: string,
) => {
    return jwtService.verifyAsync<RefreshTokenPayload>(refreshToken, {
        secret: configService.getOrThrow('JWT_REFRESH_SECRET'),
    });
};
