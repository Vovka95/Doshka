import { Injectable } from '@nestjs/common';
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

import {
  throwConflictException,
  throwForbiddenException,
  throwUnauthorizedException,
} from 'src/common/errors/throw-api-error';
import { AUTH_ERROR } from 'src/common/errors/auth.errors';
import { ENCRYPTION_ROUNDS } from 'src/common/constants/auth.constants';
import { generateTokens } from './utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponseDto> {
    const email = dto.email.trim().toLowerCase();

    const exsitingUser = await this.usersService.findByEmail(email);
    if (exsitingUser) {
      throwConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(dto.password, ENCRYPTION_ROUNDS);

    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.generateAndStoreTokens(user);

    return { ...tokens, user: this.usersService.toResponseDto(user) };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const email = dto.email.trim().toLowerCase();

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throwUnauthorizedException(AUTH_ERROR.INVALID_CREDENTIALS);
    }

    if (!user.isEmailConfirmed) {
      throwUnauthorizedException(AUTH_ERROR.EMAIL_NOT_CONFIRMED);
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
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.hashedRefreshToken || !user.isEmailConfirmed) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenValid) {
      throwForbiddenException(AUTH_ERROR.ACCESS_DENIED);
    }

    const tokens = await this.generateAndStoreTokens(user);

    return tokens;
  }

  async getMe(userId: string): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throwUnauthorizedException(AUTH_ERROR.ACCESS_DENIED);
    }

    return this.usersService.toResponseDto(foundUser);
  }

  private async generateAndStoreTokens(user: User): Promise<TokenResponseDto> {
    const tokens = await generateTokens(this.jwtService, this.configService, {
      sub: user.id,
      email: user.email,
    });
    const hashedRefreshToken = await bcrypt.hash(
      tokens.refreshToken,
      ENCRYPTION_ROUNDS,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
