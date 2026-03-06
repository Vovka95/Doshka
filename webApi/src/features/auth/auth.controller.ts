import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Query,
    UseGuards,
    Req,
    Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthTokensResponseDto } from './dto/auth-tokens-response.dto';
import { ResendConfirmationDto } from './dto/resend-confirmation.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { type AccessTokenPayload } from './interfaces/jwt-payload.interface';
import { MessageResult } from '../../common/types/message-result.type';

import {
    clearRefreshCookie,
    getRefreshCookie,
    setRefreshCookie,
} from './utils/auth-cookies.utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto): Promise<MessageResult> {
        return this.authService.signup(dto);
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Req() req: Request,
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponseDto> {
        const { accessToken, refreshToken, user } =
            await this.authService.login(dto, req);

        setRefreshCookie(res, refreshToken, this.configService);

        return { accessToken, user };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(204)
    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @CurrentUser() user: AccessTokenPayload,
    ): Promise<void> {
        const refreshToken = getRefreshCookie(req);

        await this.authService.logout(user.sub, refreshToken);

        clearRefreshCookie(res, this.configService);
    }

    @HttpCode(200)
    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthTokensResponseDto> {
        const refreshToken = getRefreshCookie(req);

        const { accessToken, refreshToken: newRefresh } =
            await this.authService.refreshTokens(refreshToken);

        setRefreshCookie(res, newRefresh, this.configService);

        return { accessToken };
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

    @HttpCode(200)
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto): Promise<MessageResult> {
        return this.authService.resetPassword(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('me')
    async me(
        @CurrentUser() user: AccessTokenPayload,
    ): Promise<UserResponseDto> {
        return this.authService.getMe(user.sub);
    }
}
