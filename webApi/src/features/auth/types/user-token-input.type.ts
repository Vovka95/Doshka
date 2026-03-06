import { UserTokenType } from '../enum/user-token-type.enum';

export type UserTokenInput = {
    userId: string;
    type: UserTokenType;
    tokenHash: string;
    expiresAt: Date;
    sentAt?: Date | null;
};
