export const genUUID = () =>
    crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
