import type { PropsWithChildren } from 'react';

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <aside className="h-full flex flex-col overflow-hidden">
            {children}
        </aside>
    );
};
