import { createHash, randomBytes } from 'crypto';

import { AUTH_CONFIRM } from '../constants';
import { addHours } from '../../../common/utils';

const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex');

export const hashEmailToken = (token: string) => sha256(token);

export const generateEmailConfirmToken = () => {
  const token = randomBytes(32).toString('hex');

  return {
    token,
    tokenHash: hashEmailToken(token),
    expiresAt: addHours(new Date(), AUTH_CONFIRM.CONFIRM_TTL_HOURS),
  };
};
