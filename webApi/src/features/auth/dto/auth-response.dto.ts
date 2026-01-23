import { UserResponseDto } from 'src/features/users/dto/user-response.dto';

export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
}
