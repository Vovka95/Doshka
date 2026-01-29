import { UserResponseDto } from 'src/features/users/dto/user-response.dto';
import { AuthTokensResponseDto } from './auth-tokens-response.dto';

export class AuthResponseDto extends AuthTokensResponseDto {
  user: UserResponseDto;
}
