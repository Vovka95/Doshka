import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { randomUUID } from 'crypto';

import { AuthSessionsService } from './auth-sessions.service';

import { AuthSession } from '../entity/auth-session.entity';

import {
    JwtTokensPayload,
    RefreshTokenPayload,
} from '../interfaces/jwt-payload.interface';

import { AuthTokens } from '../types/auth-tokens.type';

import { AUTH_ERROR } from '../constants';
import { throwForbiddenException } from 'src/common/errors/throw-api-error';

import {
    generateAccessToken,
    generateRefreshToken,
    getRefreshMaxAge,
    refreshTokenDigest,
    refreshTokenDigestMatches,
    verifyRefreshToken,
} from '../utils';

@Injectable()
export class AuthTokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly authSessionsService: AuthSessionsService,
    ) {}

    async issue(userId: string, req?: Request): Promise<AuthTokens> {
        const sessionId = randomUUID();

        const { accessToken, refreshToken } = await this.generateJwtTokens({
            sub: userId,
            sid: sessionId,
        });
        const refreshTokenHash = refreshTokenDigest(refreshToken);
        const refreshMaxAge = getRefreshMaxAge(this.configService);
        const expiresAt = new Date(Date.now() + refreshMaxAge);

        await this.authSessionsService.createSession({
            id: sessionId,
            userId,
            refreshTokenHash,
            expiresAt,
            userAgent: req?.headers['user-agent'] ?? null,
            ip: req?.ip ?? null,
        });

        return { accessToken, refreshToken };
    }

    async refresh(refreshToken: string): Promise<AuthTokens> {
        const payload = await this.verifyRefreshJwtOrThrow(refreshToken);

        const session = await this.authSessionsService.findById(payload.sid);
        this.assertSessionActiveOrThrow(session);

        await this.assertRefreshTokenIntegrityOrThrow(
            refreshToken,
            session!,
            payload.sub,
        );

        return await this.rotate(payload, session!);
    }

    async logout(userId: string, refreshToken?: string): Promise<void> {
        if (!refreshToken) {
            await this.revokeAllSessions(userId);
            return;
        }

        try {
            const payload = await this.verifyRefreshJwtOrThrow(refreshToken);
            await this.revokeSessionBySid(payload.sid);
        } catch {
            await this.revokeAllSessions(userId);
        }
    }

    async revokeAllSessions(userId: string): Promise<void> {
        await this.authSessionsService.revokeAllUserSessions(userId);
    }

    async revokeSessionBySid(sid: string): Promise<void> {
        await this.authSessionsService.revokeSession(sid);
    }

    // =========================
    // Reusable helpers
    // =========================

    private async generateJwtTokens(
        payload: JwtTokensPayload,
    ): Promise<AuthTokens> {
        const accessToken = await generateAccessToken(
            this.jwtService,
            this.configService,
            {
                sub: payload.sub,
            },
        );

        const refreshToken = await generateRefreshToken(
            this.jwtService,
            this.configService,
            {
                sub: payload.sub,
                sid: payload.sid,
            },
        );

        return { accessToken, refreshToken };
    }

    private async verifyRefreshJwtOrThrow(
        token: string,
    ): Promise<RefreshTokenPayload> {
        try {
            return await verifyRefreshToken(
                this.jwtService,
                this.configService,
                token,
            );
        } catch {
            throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
        }
    }

    private async rotate(
        payload: RefreshTokenPayload,
        session: AuthSession,
    ): Promise<AuthTokens> {
        const { accessToken, refreshToken } = await this.generateJwtTokens({
            sub: payload.sub,
            sid: payload.sid,
        });
        const refreshTokenHash = refreshTokenDigest(refreshToken);

        const rotated = await this.authSessionsService.rotateSession(
            payload.sid,
            session.refreshTokenHash,
            refreshTokenHash,
        );

        if (!rotated) {
            throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
        }

        return { accessToken, refreshToken };
    }

    private async assertRefreshTokenIntegrityOrThrow(
        rawRefreshToken: string,
        session: AuthSession,
        userId: string,
    ): Promise<void> {
        const isValid = refreshTokenDigestMatches(
            rawRefreshToken,
            session.refreshTokenHash,
        );

        if (!isValid) {
            await this.authSessionsService.revokeAllUserSessions(userId);
            throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
        }
    }

    private assertSessionActiveOrThrow(session: AuthSession | null): void {
        if (!session || session.revokedAt || session.expiresAt < new Date()) {
            throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
        }
    }
}
