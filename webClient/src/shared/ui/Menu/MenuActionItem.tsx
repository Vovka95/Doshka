import * as React from 'react';

import { MenubarItem } from '../Menubar';
import { menuItemClassName } from './menuItemClassName';

import { cn } from '@/shared/lib/cn';

type MenuActionItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
};

export const MenuActionItem = React.forwardRef<
    HTMLButtonElement,
    MenuActionItemProps
>(({ className, icon, children, ...props }, ref) => {
    return (
        <MenubarItem asChild>
            <button
                {...props}
                ref={ref}
                type={props.type ?? 'button'}
                className={cn(menuItemClassName, className)}
            >
                {icon ? (
                    <span className="inline-flex shrink-0 items-center justify-center">
                        {icon}
                    </span>
                ) : null}

                <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <span className="truncate">{children}</span>
                </span>
            </button>
        </MenubarItem>
    );
});

MenuActionItem.displayName = 'MenuActionItem';
