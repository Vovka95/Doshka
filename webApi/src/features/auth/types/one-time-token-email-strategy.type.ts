export type OneTimeTokenEmailStrategy = {
  ttlHours: number;
  send: (email: string, token: string, firstName: string) => Promise<void>;
};
