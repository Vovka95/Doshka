import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { EmailService } from '../../infrastructure/email/email.service';

import { User } from '../users/entity/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RefreshTokenPayload } from './interfaces/jwt-payload.interface';

import type { AuthResult } from './types/auth-result.type';
import type { AuthTokens } from './types/auth-tokens.type';
import type { MessageResult } from '../../common/types/message-result.type';

import {
  throwBadRequestException,
  throwConflictException,
  throwForbiddenException,
  throwUnauthorizedException,
} from '../../common/errors/throw-api-error';
import {
  AUTH_CONFIRM,
  AUTH_ERROR,
  AUTH_MESSAGE,
  AUTH_PASSWORD,
} from './constants';

import {
  generateEmailConfirmToken,
  generateJwtTokens,
  hashEmailToken,
} from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async signup(dto: SignupDto): Promise<MessageResult> {
    const email = dto.email.trim().toLowerCase();

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser?.isEmailConfirmed) {
      throwConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
    }

    if (
      existingUser?.emailConfirmSentAt &&
      !this.isResendCooldownPassed(existingUser?.emailConfirmSentAt)
    ) {
      return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT };
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_PASSWORD.HASH_ROUNDS,
    );

    const {
      token: emailConfirmToken,
      tokenHash: emailConfirmTokenHash,
      expiresAt: emailConfirmTokenExpiresAt,
    } = generateEmailConfirmToken();

    const emailConfirmSentAt = new Date();

    if (!existingUser) {
      await this.usersService.createUser({
        ...dto,
        email,
        password: hashedPassword,
        isEmailConfirmed: false,
        emailConfirmTokenHash,
        emailConfirmTokenExpiresAt,
        emailConfirmSentAt,
      });

      await this.emailService.sendEmailConfirmation(
        email,
        emailConfirmToken,
        dto.firstName,
      );

      return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT };
    }

    await this.usersService.update(existingUser.id, {
      password: hashedPassword,
      emailConfirmTokenHash,
      emailConfirmTokenExpiresAt,
      emailConfirmSentAt,
    });

    await this.emailService.sendEmailConfirmation(
      email,
      emailConfirmToken,
      existingUser.firstName,
    );

    return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT };
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const email = dto.email.trim().toLowerCase();

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    if (!user.isEmailConfirmed) {
      throwUnauthorizedException(AUTH_ERROR.EMAIL_NOT_CONFIRMED);
    }

    const tokens = await this.generateAndStoreTokens(user);

    return { ...tokens, user: this.usersService.mapToUserResponse(user) };
  }

  async logout(userId: string) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.hashedRefreshToken || !user.isEmailConfirmed) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenValid) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const tokens = await this.generateAndStoreTokens(user);

    return tokens;
  }

  async confirmEmail(token: string): Promise<MessageResult> {
    if (!token) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    const tokenHash = hashEmailToken(token);
    const user = await this.usersService.findByEmailConfirmTokenHash(tokenHash);

    if (!user) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    if (user.isEmailConfirmed) {
      return { message: AUTH_MESSAGE.EMAIL_ALREADY_CONFIRMED };
    }

    if (
      !user.emailConfirmTokenExpiresAt ||
      user.emailConfirmTokenExpiresAt < new Date()
    ) {
      throwBadRequestException(AUTH_ERROR.TOKEN_EXPIRED);
    }

    this.usersService.update(user.id, {
      isEmailConfirmed: true,
      emailConfirmTokenHash: null,
      emailConfirmTokenExpiresAt: null,
      emailConfirmSentAt: null,
    });

    return { message: AUTH_MESSAGE.EMAIL_CONFIRMED };
  }

  async resendConfirmation(emailRaw: string): Promise<MessageResult> {
    const email = emailRaw.trim().toLowerCase();
    const user = await this.usersService.findByEmail(email);

    if (!user || user.isEmailConfirmed) {
      return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS };
    }

    if (
      user?.emailConfirmSentAt &&
      !this.isResendCooldownPassed(user?.emailConfirmSentAt)
    ) {
      return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS };
    }

    const {
      token: emailConfirmToken,
      tokenHash: emailConfirmTokenHash,
      expiresAt: emailConfirmTokenExpiresAt,
    } = generateEmailConfirmToken();

    const emailConfirmSentAt = new Date();

    await this.usersService.update(user.id, {
      emailConfirmTokenHash,
      emailConfirmTokenExpiresAt,
      emailConfirmSentAt,
    });

    await this.emailService.sendEmailConfirmation(
      email,
      emailConfirmToken,
      user.firstName,
    );

    return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS };
  }

  async getMe(userId: string): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throwUnauthorizedException(AUTH_ERROR.ACCESS_DENIED);
    }

    return this.usersService.mapToUserResponse(foundUser);
  }

  private isResendCooldownPassed(sentAt: Date): boolean {
    const diffMs = Date.now() - sentAt.getTime();
    return diffMs > AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS * 1000;
  }

  private async generateAndStoreTokens(user: User): Promise<AuthTokens> {
    const tokens = await generateJwtTokens(
      this.jwtService,
      this.configService,
      { sub: user.id },
    );
    const hashedRefreshToken = await bcrypt.hash(
      tokens.refreshToken,
      AUTH_PASSWORD.HASH_ROUNDS,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
