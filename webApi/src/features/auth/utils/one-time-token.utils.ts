import { createHash, randomBytes } from 'crypto';

import { addHours } from '../../../common/utils';

const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex');

export const hashOneTimeToken = (token: string) => sha256(token);

export const generateOneTimeToken = (ttlHours: number) => {
  if (!Number.isFinite(ttlHours) || ttlHours <= 0) {
    throw new Error(`ttlHours must be > 0, got ${ttlHours}`);
  }

  const token = randomBytes(32).toString('hex');

  return {
    token,
    tokenHash: hashOneTimeToken(token),
    expiresAt: addHours(new Date(), ttlHours),
  };
};
