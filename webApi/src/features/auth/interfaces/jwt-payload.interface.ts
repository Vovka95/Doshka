export interface AccessTokenPayload {
    sub: string;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    sid: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JwtTokensPayload extends RefreshTokenPayload {}
