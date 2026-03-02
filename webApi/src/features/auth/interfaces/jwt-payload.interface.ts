export interface AccessTokenPayload {
  sub: string;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
  sid: string;
}

export interface JwtTokensPayload extends AccessTokenPayload {
  sid?: string;
}
