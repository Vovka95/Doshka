import { randomBytes } from 'crypto';

import { addHours, sha256Hex } from '../../../common/utils';

export const hashOneTimeToken = (token: string) => sha256Hex(token);

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
