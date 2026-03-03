import { Injectable } from '@nestjs/common';

import { UserTokensService } from './user-tokens.service';
import { EmailService } from 'src/infrastructure/email/email.service';

import { User } from 'src/features/users/entity/user.entity';

import { OneTimeTokenEmailStrategy } from '../types/one-time-token-email-strategy.type';
import { UserTokenType } from '../enum/user-token-type.enum';

import { throwBadRequestException } from 'src/common/errors/throw-api-error';
import { AUTH_CONFIRM, AUTH_ERROR, AUTH_RESET_PASSWORD } from '../constants';

import { generateOneTimeToken, hashOneTimeToken } from '../utils';
import { normalizeEmail } from 'src/common/utils';

@Injectable()
export class OneTimeTokenService {
  constructor(
    private readonly userTokensService: UserTokensService,
    private readonly emailService: EmailService,
  ) {}

  async sendEmailConfirmation(user: User): Promise<boolean> {
    return this.sendTokenEmail(user, UserTokenType.EMAIL_CONFIRM);
  }

  async sendPasswordReset(user: User): Promise<boolean> {
    return this.sendTokenEmail(user, UserTokenType.PASSWORD_RESET);
  }

  async consumeOrThrow(
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

  async invalidateAllActive(
    userId: string,
    type: UserTokenType,
  ): Promise<void> {
    await this.userTokensService.invalidateAllActive(userId, type);
  }

  // =========================
  // Reusable helpers
  // =========================

  private readonly strategies: {
    [UserTokenType.EMAIL_CONFIRM]: OneTimeTokenEmailStrategy;
    [UserTokenType.PASSWORD_RESET]: OneTimeTokenEmailStrategy;
  } = {
    [UserTokenType.EMAIL_CONFIRM]: {
      ttlHours: AUTH_CONFIRM.TTL_HOURS,
      cooldownSeconds: AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
      send: (email, token, firstName) =>
        this.emailService.sendEmailConfirmation(email, token, firstName),
    },
    [UserTokenType.PASSWORD_RESET]: {
      ttlHours: AUTH_RESET_PASSWORD.TTL_HOURS,
      cooldownSeconds: AUTH_CONFIRM.RESEND_COOLDOWN_SECONDS,
      send: (email, token, firstName) =>
        this.emailService.sendResetPasswordEmail(email, token, firstName),
    },
  };

  private async sendTokenEmail(
    user: User,
    type: UserTokenType,
  ): Promise<boolean> {
    const strategy = this.strategies[type];
    if (!strategy) throwBadRequestException(AUTH_ERROR.INVALID_TOKEN);

    const canSend = await this.userTokensService.canSend(
      user.id,
      type,
      strategy.cooldownSeconds,
    );

    if (!canSend) return false;

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

    return true;
  }
}
