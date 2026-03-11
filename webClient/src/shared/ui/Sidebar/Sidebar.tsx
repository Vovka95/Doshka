import type { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/cn';

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <aside className={cn('h-full flex flex-col overflow-hidden py-2 pl-2')}>
            {children}
        </aside>
    );
};
