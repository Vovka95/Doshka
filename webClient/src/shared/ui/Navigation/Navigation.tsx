import type { PropsWithChildren } from 'react';

export const Navigation = ({ children }: PropsWithChildren) => {
    return <nav className="flex-1 px-2 pb-4 overflow-y-auto">{children}</nav>;
};
