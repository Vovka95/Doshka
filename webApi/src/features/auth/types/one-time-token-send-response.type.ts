import { CreateEmailResponseSuccess } from 'resend';

export type OneTimeTokenSendResponse =
    | {
          ok: true;
          data: CreateEmailResponseSuccess;
      }
    | {
          ok: false;
          data: null;
      };
