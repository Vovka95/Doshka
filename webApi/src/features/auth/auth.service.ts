import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { User } from '../users/entity/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RefreshTokenPayload } from './interfaces/jwt-payload.interface';

import type { AuthResult } from './types/auth-result.type';
import type { AuthTokens } from './types/auth-tokens.type';

import {
  throwConflictException,
  throwForbiddenException,
  throwUnauthorizedException,
} from 'src/common/errors/throw-api-error';
import { AUTH_ERROR, AUTH_PASSWORD } from './constants';

import { generateJwtTokens } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResult> {
    const email = dto.email.trim().toLowerCase();

    const exsitingUser = await this.usersService.findByEmail(email);
    if (exsitingUser && exsitingUser.isEmailConfirmed) {
      throwConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      AUTH_PASSWORD.HASH_ROUNDS,
    );

    const user = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const tokens = await this.generateAndStoreTokens(user);

    return { ...tokens, user: this.usersService.mapToUserResponse(user) };
  }

  async login(dto: LoginDto): Promise<AuthResult> {
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

    return { ...tokens, user: this.usersService.mapToUserResponse(user) };
  }

  async logout(userId: string) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    let payload: RefreshTokenPayload;

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

    return this.usersService.mapToUserResponse(foundUser);
  }

  private async generateAndStoreTokens(user: User): Promise<AuthTokens> {
    const tokens = await generateJwtTokens(
      this.jwtService,
      this.configService,
      { sub: user.id },
    );
    const hashedRefreshToken = await bcrypt.hash(
      tokens.refreshToken,
      AUTH_PASSWORD.HASH_ROUNDS,
    );
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return tokens;
  }
}
