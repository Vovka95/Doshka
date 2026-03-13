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
    xs: 'h-4 w-4 text-xs rounded-xs',
    sm: 'h-5 w-5 text-sm rounded-xs',
    md: 'h-6 w-6 text-md rounded-xs',
    lg: 'h-6 w-6 text-base rounded-xs',
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
        <Avatar className={cn(sizes[size], className)}>
            {imageUrl ? (
                <AvatarImage
                    className={cn(sizes[size])}
                    src={imageUrl}
                    alt={name ?? 'Workspace'}
                />
            ) : null}

            <AvatarFallback
                className={cn([sizes[size], fallbackColorClassName])}
            >
                {initials}
            </AvatarFallback>
        </Avatar>
    );
};
