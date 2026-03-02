import type { AuthTokens } from './auth-tokens.type';

export type JwtTokensResult = AuthTokens & { sid: string };
