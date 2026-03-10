import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

import { getInitials } from '@/shared/lib/string/getInitials';
import { getAvatarColorClassName } from '@/shared/lib/avatar/getAvatarColorClassName';
import { cn } from '@/shared/lib/cn';

type WorkspaceAvatarSize = 'xs' | 'sm' | 'md' | 'lg';

type WorkspaceAvatarProps = {
    name?: string | null;
    imageUrl?: string | null;
    size?: WorkspaceAvatarSize;
    className?: string;
};

const sizes: Record<WorkspaceAvatarSize, string> = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
};

export const WorkspaceAvatar = ({
    name,
    imageUrl,
    size = 'sm',
    className,
}: WorkspaceAvatarProps) => {
    const initials = getInitials(name);
    const fallbackColorClassName = getAvatarColorClassName(name);

    return (
        <Avatar className={cn('rounded-sm', sizes[size], className)}>
            {imageUrl ? (
                <AvatarImage src={imageUrl} alt={name ?? 'Workspace'} />
            ) : null}

            <AvatarFallback
                className={cn(['rounded-sm', fallbackColorClassName])}
            >
                {initials}
            </AvatarFallback>
        </Avatar>
    );
};
