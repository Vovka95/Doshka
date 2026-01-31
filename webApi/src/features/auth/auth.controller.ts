import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthTokensResponseDto } from './dto/auth-tokens-response.dto';
import { ResendConfirmationDto } from './dto/resend-confirmation.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { type AccessTokenPayload } from './interfaces/jwt-payload.interface';
import { MessageResult } from '../../common/types/message-result.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<MessageResult> {
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @Post('logout')
  async logout(@CurrentUser() user: AccessTokenPayload): Promise<void> {
    return this.authService.logout(user.sub);
  }

  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto): Promise<AuthTokensResponseDto> {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Get('confirm-email')
  confirmEmail(@Query('token') token: string): Promise<MessageResult> {
    return this.authService.confirmEmail(token);
  }

  @HttpCode(200)
  @Post('resend-confirmation')
  resendConfirmation(
    @Body() dto: ResendConfirmationDto,
  ): Promise<MessageResult> {
    return this.authService.resendConfirmation(dto.email);
  }

  @HttpCode(200)
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto): Promise<MessageResult> {
    return this.authService.forgotPassword(dto.email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async me(@CurrentUser() user: AccessTokenPayload): Promise<UserResponseDto> {
    return this.authService.getMe(user.sub);
  }
}
