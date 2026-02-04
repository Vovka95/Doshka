import { createHash, timingSafeEqual } from 'crypto';

export const sha256Hex = (value: string): string => {
  return createHash('sha256').update(value).digest('hex');
};

export const sha256HexEquels = (a: string, bHex: string): boolean => {
  const bufferA = Buffer.from(sha256Hex(a), 'hex');
  const bufferB = Buffer.from(bHex, 'hex');

  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
};
