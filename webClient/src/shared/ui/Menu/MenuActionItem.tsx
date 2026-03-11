import * as React from 'react';

import { MenubarItem } from '../Menubar';

import { Button } from '../Button';

type MenuActionItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
};

export const MenuActionItem = React.forwardRef<
    HTMLButtonElement,
    MenuActionItemProps
>(({ className, icon, children, ...props }, ref) => {
    return (
        <MenubarItem asChild>
            <Button
                {...props}
                ref={ref}
                className="w-full justify-start font-normal"
                variant="ghost"
                size="xs"
            >
                {children}
            </Button>
        </MenubarItem>
    );
});

MenuActionItem.displayName = 'MenuActionItem';
