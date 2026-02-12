let accessToken: string | null = null;

export const accessTokenStore = {
    get: () => accessToken,
    set: (t: string | null) => {
        accessToken = t;
    },
    clear: () => {
        accessToken = null;
    },
};
