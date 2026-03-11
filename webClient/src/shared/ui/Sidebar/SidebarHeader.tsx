import type { PropsWithChildren } from 'react';

export const SidebarHeader = ({ children }: PropsWithChildren) => {
    return (
        <div className="px-2 mb-2 shrink-0 flex items-center">{children}</div>
    );
};
