export interface DecodedJwtPayload {
  sub?: string;
  jti?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}
