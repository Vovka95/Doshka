import { UserToken } from '../entity/user-token.entity';

export type UserTokenConsumeResult =
  | { ok: true; token: UserToken }
  | { ok: false; reason: 'NOT_FOUND' | 'USED' | 'EXPIRED' };
