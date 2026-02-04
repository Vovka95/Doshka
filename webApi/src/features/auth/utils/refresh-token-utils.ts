import { sha256Hex, sha256HexEquels } from 'src/common/utils';

export const refreshTokenDigest = (token: string) => sha256Hex(token);

export const refreshTokenDigestMatches = (token: string, digest: string) =>
  sha256HexEquels(token, digest);
