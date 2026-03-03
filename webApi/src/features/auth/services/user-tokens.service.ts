import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';

import { UserToken } from '../entity/user-token.entity';
import { UserTokenInput } from '../types/user-token-input.type';
import { UserTokenType } from '../enum/user-token-type.enum';
import { isResendCooldownPassed } from 'src/common/utils';
import { UserTokenConsumeResult } from '../types/user-token-consume-result.type';

@Injectable()
export class UserTokensService {
  constructor(
    @InjectRepository(UserToken)
    private readonly repository: Repository<UserToken>,
  ) {}

  async createAndInvalidatePrevious(input: UserTokenInput): Promise<UserToken> {
    const { userId, type, tokenHash, expiresAt, sentAt } = input;
    const now = new Date();

    await this.repository.update(
      {
        userId,
        type,
        usedAt: IsNull(),
        invalidatedAt: IsNull(),
        expiresAt: MoreThan(now),
      },
      { invalidatedAt: now },
    );

    const token = this.repository.create({
      userId,
      type,
      tokenHash,
      expiresAt,
      invalidatedAt: null,
      usedAt: null,
      sentAt: sentAt ?? null,
    });

    return this.repository.save(token);
  }

  async canSend(
    userId: string,
    type: UserTokenType,
    cooldownSeconds: number,
  ): Promise<boolean> {
    if (!Number.isFinite(cooldownSeconds) || cooldownSeconds <= 0) return true;

    const last = await this.repository.findOne({
      where: { userId, type },
      order: { sentAt: 'DESC' },
    });

    if (!last?.sentAt) return true;

    return isResendCooldownPassed(last.sentAt, cooldownSeconds);
  }

  async consume(
    tokenHash: string,
    type: UserTokenType,
  ): Promise<UserTokenConsumeResult> {
    const now = new Date();

    const found = await this.repository.findOne({ where: { type, tokenHash } });

    if (!found) return { ok: false, reason: 'NOT_FOUND' };
    if (found.invalidatedAt) return { ok: false, reason: 'EXPIRED' };
    if (found.expiresAt < now) return { ok: false, reason: 'EXPIRED' };
    if (found.usedAt) return { ok: false, reason: 'USED' };

    const response = await this.repository.update(
      {
        id: found.id,
        usedAt: IsNull(),
        invalidatedAt: IsNull(),
        expiresAt: MoreThan(now),
      },
      { usedAt: now },
    );

    if (!response.affected) {
      const fresh = await this.repository.findOne({ where: { id: found.id } });

      if (!fresh) return { ok: false, reason: 'NOT_FOUND' };
      if (fresh.usedAt) return { ok: false, reason: 'USED' };
      return { ok: false, reason: 'EXPIRED' };
    }

    return { ok: true, token: { ...found, usedAt: now } as UserToken };
  }

  async invalidateAllActive(
    userId: string,
    type: UserTokenType,
  ): Promise<void> {
    const now = new Date();

    await this.repository.update(
      {
        userId,
        type,
        usedAt: IsNull(),
        invalidatedAt: IsNull(),
        expiresAt: MoreThan(now),
      },
      { invalidatedAt: now },
    );
  }

  async markExpiredAsInvalidated(): Promise<void> {
    const now = new Date();

    await this.repository.update(
      {
        usedAt: IsNull(),
        invalidatedAt: IsNull(),
        expiresAt: LessThanOrEqual(now),
      },
      { invalidatedAt: now },
    );
  }
}
