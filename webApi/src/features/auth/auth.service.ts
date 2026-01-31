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
import { ResetPasswordDto } from './dto/reset-password.dto';
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
  AUTH_RESET_PASSWORD,
} from './constants';

import {
  generateJwtTokens,
  generateOneTimeToken,
  hashOneTimeToken,
} from './utils';
import { isResendCooldownPassed } from 'src/common/utils';

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
      !isResendCooldownPassed(
        existingUser?.emailConfirmSentAt,
        AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
      )
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
    } = generateOneTimeToken(AUTH_CONFIRM.TTL_HOURS);

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
    return this.usersService.update(userId, {
      refreshTokenHash: null,
      refreshTokenUpdatedAt: null,
    });
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
    if (!user || !user.refreshTokenHash || !user.isEmailConfirmed) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
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

    const tokenHash = hashOneTimeToken(token);
    const user = await this.usersService.findByEmailConfirmTokenHash(tokenHash);

    if (!user) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    if (
      !user.emailConfirmTokenExpiresAt ||
      user.emailConfirmTokenExpiresAt < new Date()
    ) {
      throwBadRequestException(AUTH_ERROR.TOKEN_EXPIRED);
    }

    await this.usersService.update(user.id, {
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
      !isResendCooldownPassed(
        user?.emailConfirmSentAt,
        AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
      )
    ) {
      return { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS };
    }

    const {
      token: emailConfirmToken,
      tokenHash: emailConfirmTokenHash,
      expiresAt: emailConfirmTokenExpiresAt,
    } = generateOneTimeToken(AUTH_CONFIRM.TTL_HOURS);

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

  async forgotPassword(emailRaw: string): Promise<MessageResult> {
    const email = emailRaw.trim().toLowerCase();

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: AUTH_MESSAGE.RESET_PASSWORD_EMAIL_SENT_IF_EXISTS };
    }

    if (
      user?.passwordResetSentAt &&
      !isResendCooldownPassed(
        user?.passwordResetSentAt,
        AUTH_RESET_PASSWORD.RESEND_COOLDOWN_SECONDS,
      )
    ) {
      return { message: AUTH_MESSAGE.RESET_PASSWORD_EMAIL_SENT_IF_EXISTS };
    }

    const {
      token: passwordResetToken,
      tokenHash: passwordResetTokenHash,
      expiresAt: passwordResetTokenExpiresAt,
    } = generateOneTimeToken(AUTH_RESET_PASSWORD.TTL_HOURS);

    const passwordResetSentAt = new Date();

    await this.usersService.update(user.id, {
      passwordResetTokenHash,
      passwordResetTokenExpiresAt,
      passwordResetSentAt,
    });

    await this.emailService.sendResetPasswordEmail(
      email,
      passwordResetToken,
      user.firstName,
    );

    return { message: AUTH_MESSAGE.RESET_PASSWORD_EMAIL_SENT_IF_EXISTS };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageResult> {
    if (!dto.token) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    const tokenHash = hashOneTimeToken(dto.token);
    const user =
      await this.usersService.findByPasswordResetTokenHash(tokenHash);

    if (!user) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    if (
      !user?.passwordResetTokenExpiresAt ||
      user.passwordResetTokenExpiresAt < new Date()
    ) {
      throwBadRequestException(AUTH_ERROR.TOKEN_EXPIRED);
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_PASSWORD.HASH_ROUNDS,
    );

    this.usersService.update(user.id, {
      password: hashedPassword,
      passwordResetTokenHash: null,
      passwordResetTokenExpiresAt: null,
      passwordResetSentAt: null,
      refreshTokenHash: null,
      refreshTokenUpdatedAt: null,
    });

    return { message: AUTH_MESSAGE.PASSWORD_RESET_SUCCESS };
  }

  async getMe(userId: string): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throwUnauthorizedException(AUTH_ERROR.ACCESS_DENIED);
    }

    return this.usersService.mapToUserResponse(foundUser);
  }

  private async generateAndStoreTokens(user: User): Promise<AuthTokens> {
    const tokens = await generateJwtTokens(
      this.jwtService,
      this.configService,
      { sub: user.id },
    );
    const refreshTokenHash = await bcrypt.hash(
      tokens.refreshToken,
      AUTH_PASSWORD.HASH_ROUNDS,
    );

    await this.usersService.update(user.id, {
      refreshTokenHash,
      refreshTokenUpdatedAt: refreshTokenHash ? new Date() : null,
    });

    return tokens;
  }
}
