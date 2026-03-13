import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { join } from 'path';

import { renderEmailTemplate } from './utils/email-templates';

@Injectable()
export class EmailService {
    private readonly resend: Resend;
    private readonly templateDir: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly logger = new Logger(EmailService.name),
    ) {
        this.resend = new Resend(
            this.configService.getOrThrow<string>('RESEND_API_KEY'),
        );

        this.templateDir = join(__dirname, 'templates');
    }

    private get frontendOrigin() {
        return this.configService.getOrThrow<string>('FRONTEND_ORIGIN');
    }

    private get from() {
        return `Doshka Team <${this.configService.getOrThrow<string>('EMAIL_FROM')}>`;
    }

    async getEmailById(id: string) {
        return this.resend.emails.get(id);
    }

    async sendEmailConfirmation(to: string, token: string, firstName: string) {
        const confirmEmailUrl = `${this.frontendOrigin}/auth/confirm-email?token=${encodeURIComponent(token)}`;

        const html = await renderEmailTemplate(
            this.templateDir,
            'confirm-email',
            {
                confirmEmailUrl,
                firstName,
            },
        );

        const { data, error } = await this.resend.emails.send({
            from: this.from,
            to,
            subject: 'Confirm your email',
            html,
        });

        if (error) {
            this.logger.error('Failed to send confirmation email', error);
            return null;
        }

        return data;
    }

    async sendResetPasswordEmail(to: string, token: string, firstName: string) {
        const resetPasswordUrl = `${this.frontendOrigin}/auth/reset-password?token=${encodeURIComponent(token)}`;

        const html = await renderEmailTemplate(
            this.templateDir,
            'reset-password',
            {
                resetPasswordUrl,
                firstName,
            },
        );

        const { data, error } = await this.resend.emails.send({
            from: this.from,
            to,
            subject: 'Reset your Doshka password',
            html,
        });

        if (error) {
            this.logger.error('Failed to send reset password email', error);
            return null;
        }

        return data;
    }
}
