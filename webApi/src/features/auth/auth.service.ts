import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { UsersService } from '../users/users.service';
import { EmailService } from '../../infrastructure/email/email.service';
import { AuthSessionsService } from './services/auth-sessions.service';
import { UserTokensService } from './services/user-tokens.service';
import { AuthTokenService } from './services/auth-token.service';

import { User } from '../users/entity/user.entity';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import type { AuthResult } from './types/auth-result.type';
import type { AuthTokens } from './types/auth-tokens.type';
import type { MessageResult } from '../../common/types/message-result.type';
import { OneTimeTokenEmailStrategy } from './types/one-time-token-email-strategy.type';

import { UserTokenType } from './enum/user-token-type.enum';

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

import { generateOneTimeToken, hashOneTimeToken } from './utils';

import { normalizeEmail } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly authSessionsService: AuthSessionsService,
    private readonly userTokensService: UserTokensService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async signup(dto: SignupDto): Promise<MessageResult> {
    const response = { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT };

    const email = normalizeEmail(dto.email);
    const tokenType = UserTokenType.EMAIL_CONFIRM;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser?.isEmailConfirmed) {
      throwConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
    }

    if (existingUser) {
      const canSend = await this.userTokensService.canSend(
        existingUser.id,
        tokenType,
        AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
      );

      if (!canSend) {
        return response;
      }
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user =
      existingUser ??
      (await this.usersService.createUser({
        ...dto,
        email,
        password: hashedPassword,
        isEmailConfirmed: false,
      }));

    if (existingUser) {
      await this.usersService.update(existingUser.id, {
        password: hashedPassword,
      });
    }

    await this.createAndSendOneTimeTokenEmail(user, tokenType);

    return response;
  }

  async login(dto: LoginDto, req: Request): Promise<AuthResult> {
    const email = normalizeEmail(dto.email);
    const user = await this.usersService.findByEmail(email);
    await this.assertValidLogin(user, dto.password);

    const tokens = await this.authTokenService.issue(user!.id, req);
    return { ...tokens, user: this.usersService.mapToUserResponse(user!) };
  }

  async logout(userId: string, refreshToken?: string): Promise<void> {
    return this.authTokenService.logout(userId, refreshToken);
  }

  async refreshTokens(refreshToken?: string): Promise<AuthTokens> {
    if (!refreshToken) throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    return this.authTokenService.refresh(refreshToken);
  }

  async confirmEmail(token: string): Promise<MessageResult> {
    const tokenType = UserTokenType.EMAIL_CONFIRM;
    const { userId } = await this.consumeOneTimeTokenOrThrow(token, tokenType);

    await this.usersService.update(userId, {
      isEmailConfirmed: true,
    });
    await this.userTokensService.invalidateAllActive(userId, tokenType);

    return { message: AUTH_MESSAGE.EMAIL_CONFIRMED };
  }

  async resendConfirmation(emailRaw: string): Promise<MessageResult> {
    const response = {
      message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS,
    };

    const email = normalizeEmail(emailRaw);
    const tokenType = UserTokenType.EMAIL_CONFIRM;

    const user = await this.usersService.findByEmail(email);
    if (!user || user.isEmailConfirmed) {
      return response;
    }

    const canSend = await this.userTokensService.canSend(
      user.id,
      tokenType,
      AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
    );

    if (!canSend) {
      return response;
    }

    await this.createAndSendOneTimeTokenEmail(user, tokenType);

    return response;
  }

  async forgotPassword(emailRaw: string): Promise<MessageResult> {
    const response = {
      message: AUTH_MESSAGE.RESET_PASSWORD_EMAIL_SENT_IF_EXISTS,
    };

    const email = normalizeEmail(emailRaw);

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return response;
    }

    const canSend = await this.userTokensService.canSend(
      user.id,
      UserTokenType.PASSWORD_RESET,
      AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
    );

    if (!canSend) {
      return response;
    }

    await this.createAndSendOneTimeTokenEmail(
      user,
      UserTokenType.PASSWORD_RESET,
    );

    return response;
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageResult> {
    const tokenType = UserTokenType.PASSWORD_RESET;
    const { userId } = await this.consumeOneTimeTokenOrThrow(
      dto.token,
      tokenType,
    );
    const hashedPassword = await this.hashPassword(dto.password);
    await this.usersService.update(userId, {
      password: hashedPassword,
    });

    await this.authSessionsService.revokeAllUserSessions(userId);
    await this.userTokensService.invalidateAllActive(userId, tokenType);

    return { message: AUTH_MESSAGE.PASSWORD_RESET_SUCCESS };
  }

  async getMe(userId: string): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throwUnauthorizedException(AUTH_ERROR.ACCESS_DENIED);
    }

    return this.usersService.mapToUserResponse(foundUser);
  }

  // =========================
  // Reusable helpers
  // =========================

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, AUTH_PASSWORD.HASH_ROUNDS);
  }

  private async assertValidLogin(
    user: User | null,
    password: string,
  ): Promise<void> {
    if (!user) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    if (!user.isEmailConfirmed) {
      throwUnauthorizedException(AUTH_ERROR.EMAIL_NOT_CONFIRMED);
    }
  }

  private readonly oneTimeTokenEmailStrategies: {
    [UserTokenType.EMAIL_CONFIRM]: OneTimeTokenEmailStrategy;
    [UserTokenType.PASSWORD_RESET]: OneTimeTokenEmailStrategy;
  } = {
    [UserTokenType.EMAIL_CONFIRM]: {
      ttlHours: AUTH_CONFIRM.TTL_HOURS,
      send: (email, token, firstName) =>
        this.emailService.sendEmailConfirmation(email, token, firstName),
    },

    [UserTokenType.PASSWORD_RESET]: {
      ttlHours: AUTH_RESET_PASSWORD.TTL_HOURS,
      send: (email, token, firstName) =>
        this.emailService.sendResetPasswordEmail(email, token, firstName),
    },
  };

  private async createAndSendOneTimeTokenEmail(
    user: User,
    type: UserTokenType,
  ): Promise<void> {
    const strategy = this.oneTimeTokenEmailStrategies[type];

    if (!strategy) {
      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    const email = normalizeEmail(user.email);
    const sentAt = new Date();

    const { token, tokenHash, expiresAt } = generateOneTimeToken(
      strategy.ttlHours,
    );

    await this.userTokensService.createAndInvalidatePrevious({
      userId: user.id,
      type,
      tokenHash,
      expiresAt,
      sentAt,
    });

    await strategy.send(email, token, user.firstName);
  }

  private async consumeOneTimeTokenOrThrow(
    token: string,
    type: UserTokenType,
  ): Promise<{ userId: string }> {
    if (!token) throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);

    const tokenHash = hashOneTimeToken(token);

    const result = await this.userTokensService.consume(tokenHash, type);

    if (!result.ok) {
      if (result.reason === 'EXPIRED')
        throwBadRequestException(AUTH_ERROR.TOKEN_EXPIRED);

      if (result.reason === 'USED')
        throwBadRequestException(AUTH_ERROR.TOKEN_ALREADY_USED);

      throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);
    }

    return { userId: result.token.userId };
  }
}
