import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { generateTokens } from './utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    const exsitingUser = await this.usersService.findByEmail(dto.email);
    if (exsitingUser) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = bcrypt.hashSync(dto.password, 10);

    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await generateTokens(
      this.jwtService,
      { userId: user.id, email: user.email },
      this.configService.getOrThrow('JWT_EXPIRES_IN'),
      this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    );

    const hashedRefreshToken = bcrypt.hashSync(tokens.refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
