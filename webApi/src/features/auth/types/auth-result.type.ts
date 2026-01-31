import type { AuthTokens } from './auth-tokens.type';
import type { UserResponseDto } from '../../users/dto/user-response.dto';

export type AuthResult = AuthTokens & {
  user: UserResponseDto;
};
