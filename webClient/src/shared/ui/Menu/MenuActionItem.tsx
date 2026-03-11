import { MenubarItem } from '../Menubar';

import { Button, type ButtonProps } from '../Button';

export type MenuActionItemProps = Omit<ButtonProps, 'variant'>;

export const MenuActionItem = ({ children, ...props }: MenuActionItemProps) => {
    return (
        <MenubarItem asChild>
            <Button
                {...props}
                className="w-full justify-start font-normal"
                variant="ghost"
            >
                {children}
            </Button>
        </MenubarItem>
    );
};
