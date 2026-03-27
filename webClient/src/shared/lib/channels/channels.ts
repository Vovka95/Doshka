export const getAuthChannel = () => {
    if (typeof window === 'undefined') return null;
    return new BroadcastChannel('auth');
};
