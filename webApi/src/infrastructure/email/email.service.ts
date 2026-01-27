import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmailConfirmation(to: string, token: string) {
    const confirmEmailUrl = `${this.configService.getOrThrow<string>('FRONTEND_ORIGIN')}/auth/confirm-email?token=${token}`;

    this.mailerService.sendMail({
      to,
      subject: 'Confirm your email',
      template: 'confirm-email',
      context: { confirmEmailUrl },
    });
  }

  async sendResetPasswordEmail(to: string, token: string) {
    const resetPasswordUrl = `${this.configService.getOrThrow<string>('FRONTEND_ORIGIN')}/auth/reset-password?token=${token}`;

    this.mailerService.sendMail({
      to,
      subject: 'Reset your Doshka password',
      template: 'reset-password',
      context: { resetPasswordUrl },
    });
  }
}
