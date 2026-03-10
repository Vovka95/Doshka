import type { PropsWithChildren } from 'react';

export const SidebarHeader = ({ children }: PropsWithChildren) => {
    return <div className="px-2 pb-2 shrink-0">{children}</div>;
};
