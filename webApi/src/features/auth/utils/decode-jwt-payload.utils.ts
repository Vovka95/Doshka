import { DecodedJwtPayload } from '../interfaces/decode-jwt-payload.interface';

export const decodeJwtPayload = (token: string): DecodedJwtPayload => {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) {
      return {};
    }

    const json = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    return JSON.parse(json);
  } catch {
    return {};
  }
};
