import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { type JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entity/user.entity';

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

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    const exsitingUser = await this.usersService.findByEmail(dto.email);
    if (exsitingUser) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = bcrypt.hashSync(dto.password, ENCRYPTION_SALT);

    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.generateAndStoreTokens(user);

    return { ...tokens, user: this.usersService.toResponseDto(user) };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = bcrypt.compareSync(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateAndStoreTokens(user);

    return { ...tokens, user: this.usersService.toResponseDto(user) };
  }

  async logout(userId: string) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponseDto> {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const isRefreshTokenValid = bcrypt.compareSync(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const tokens = await this.generateAndStoreTokens(user);

    return tokens;
  }

  async getMe(@CurrentUser() user: JwtPayload): Promise<UserResponseDto> {
    const userId = user.sub;
    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throw new UnauthorizedException('User is not found');
    }

    return this.usersService.toResponseDto(foundUser);
  }

  private async generateAndStoreTokens(user: User): Promise<TokenResponseDto> {
    const tokens = await generateTokens(this.jwtService, this.configService, {
      sub: user.id,
      email: user.email,
    });
    const hashedRefreshToken = bcrypt.hashSync(
      tokens.refreshToken,
      ENCRYPTION_SALT,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
