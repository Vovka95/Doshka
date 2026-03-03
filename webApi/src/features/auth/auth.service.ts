import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { UsersService } from '../users/users.service';
import { AuthTokenService } from './services/auth-token.service';
import { OneTimeTokenService } from './services/one-time-token.service';

import { User } from '../users/entity/user.entity';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import type { AuthResult } from './types/auth-result.type';
import type { AuthTokens } from './types/auth-tokens.type';
import type { MessageResult } from '../../common/types/message-result.type';

import { UserTokenType } from './enum/user-token-type.enum';

import {
  throwConflictException,
  throwForbiddenException,
  throwUnauthorizedException,
} from '../../common/errors/throw-api-error';
import { AUTH_ERROR, AUTH_MESSAGE, AUTH_PASSWORD } from './constants';

import { normalizeEmail } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authTokenService: AuthTokenService,
    private readonly oneTimeTokenService: OneTimeTokenService,
  ) {}

  async signup(dto: SignupDto): Promise<MessageResult> {
    const response = { message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT };

    const email = normalizeEmail(dto.email);

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser?.isEmailConfirmed) {
      throwConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
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

    await this.oneTimeTokenService.sendEmailConfirmation(user);

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
    const { userId } = await this.oneTimeTokenService.consumeOrThrow(
      token,
      tokenType,
    );

    await this.usersService.update(userId, {
      isEmailConfirmed: true,
    });

    await this.oneTimeTokenService.invalidateAllActive(userId, tokenType);

    return { message: AUTH_MESSAGE.EMAIL_CONFIRMED };
  }

  async resendConfirmation(emailRaw: string): Promise<MessageResult> {
    const response = {
      message: AUTH_MESSAGE.CONFIRMATION_EMAIL_SENT_IF_EXISTS,
    };

    const email = normalizeEmail(emailRaw);

    const user = await this.usersService.findByEmail(email);
    if (!user || user.isEmailConfirmed) {
      return response;
    }

    await this.oneTimeTokenService.sendEmailConfirmation(user);

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

    await this.oneTimeTokenService.sendPasswordReset(user);

    return response;
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageResult> {
    const tokenType = UserTokenType.PASSWORD_RESET;
    const { userId } = await this.oneTimeTokenService.consumeOrThrow(
      dto.token,
      tokenType,
    );

    const hashedPassword = await this.hashPassword(dto.password);
    await this.usersService.update(userId, {
      password: hashedPassword,
    });

    await this.authTokenService.revokeAllSessions(userId);
    await this.oneTimeTokenService.invalidateAllActive(userId, tokenType);

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
}
