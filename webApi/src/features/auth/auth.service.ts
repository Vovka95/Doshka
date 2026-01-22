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
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { type JwtPayload } from './interfaces/jwt-payload.interface';

import { generateTokens } from './utils/token.utils';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { ENCRYPTION_SALT } from 'src/common/constants/auth.constants';

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

    const hashedPassword = bcrypt.hashSync(dto.password, ENCRYPTION_SALT);

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

    const hashedRefreshToken = bcrypt.hashSync(
      tokens.refreshToken,
      ENCRYPTION_SALT,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await generateTokens(
      this.jwtService,
      { userId: user.id, email: user.email },
      this.configService.getOrThrow('JWT_EXPIRES_IN'),
      this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    );

    const hashedRefreshToken = bcrypt.hashSync(
      tokens.refreshToken,
      ENCRYPTION_SALT,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }

  async getMe(@CurrentUser() user: JwtPayload): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(user.userId);

    if (!foundUser) {
      throw new UnauthorizedException('User is not found');
    }

    const { id, email, firstName, lastName, avatarUrl } = foundUser;
    return { id, email, firstName, lastName, avatarUrl };
  }
}
