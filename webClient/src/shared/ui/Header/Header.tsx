import type { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <header className="flex justify-between px-2 mb-2">{children}</header>
    );
};
