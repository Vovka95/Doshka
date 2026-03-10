import type { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <header className="flex justify-between px-2 pb-2">{children}</header>
    );
};
