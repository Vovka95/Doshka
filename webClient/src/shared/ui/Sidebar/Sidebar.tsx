import type { PropsWithChildren } from 'react';

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <aside className="h-full flex flex-col overflow-hidden py-2 pl-2">
            {children}
        </aside>
    );
};
