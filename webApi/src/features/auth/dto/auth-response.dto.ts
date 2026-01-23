import { UserResponseDto } from 'src/features/users/dto/user-response.dto';
import { TokenResponseDto } from './token-response.dto';

export class AuthResponseDto extends TokenResponseDto {
  user: UserResponseDto;
}
