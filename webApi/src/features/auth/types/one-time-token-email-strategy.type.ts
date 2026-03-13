import { CreateEmailResponseSuccess } from 'resend';

export type OneTimeTokenEmailStrategy = {
    ttlHours: number;
    cooldownSeconds: number;
    send: (
        email: string,
        token: string,
        firstName: string,
    ) => Promise<CreateEmailResponseSuccess | null>;
};
