// shared/lib/avatar/getAvatarColorClassName.ts

const avatarColorClasses = [
    'bg-red-500 text-white',
    'bg-orange-500 text-white',
    'bg-amber-500 text-black',
    'bg-yellow-500 text-black',
    'bg-lime-500 text-black',
    'bg-green-500 text-white',
    'bg-emerald-500 text-white',
    'bg-teal-500 text-white',
    'bg-cyan-500 text-white',
    'bg-sky-500 text-white',
    'bg-blue-500 text-white',
    'bg-indigo-500 text-white',
    'bg-violet-500 text-white',
    'bg-purple-500 text-white',
    'bg-fuchsia-500 text-white',
    'bg-pink-500 text-white',
    'bg-rose-500 text-white',
] as const;

const hashString = (value: string) => {
    let hash = 0;

    for (let i = 0; i < value.length; i += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }

    return Math.abs(hash);
};

export const getAvatarColorClassName = (value?: string | null) => {
    if (!value?.trim()) {
        return 'bg-muted text-muted-fg';
    }

    const index =
        hashString(value.trim().toLowerCase()) % avatarColorClasses.length;

    return avatarColorClasses[index];
};
