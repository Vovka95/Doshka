export const getInitials = (value?: string | null) => {
    if (!value?.trim()) return '?';

    const parts = value.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].slice(0, 1).toUpperCase();
    }

    return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
};
