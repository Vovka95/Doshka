import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthTokenService } from './services/auth-token.service';
import { AuthSessionsService } from './services/auth-sessions.service';
import { UserTokensService } from './services/user-tokens.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../../infrastructure/email/email.module';

import { AuthSession } from './entity/auth-session.entity';
import { UserToken } from './entity/user-token.entity';

import { JwtStrategy } from './strategies/jwt-strategy';

import { ExpiresIn } from './types/expires-in.type';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<ExpiresIn>('JWT_EXPIRES_IN') || '15m',
        },
      }),
    }),
    TypeOrmModule.forFeature([AuthSession, UserToken]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthTokenService,
    AuthSessionsService,
    UserTokensService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
