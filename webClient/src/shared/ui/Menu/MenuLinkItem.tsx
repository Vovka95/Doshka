import type { ReactNode } from 'react';

import {
    StyledNavLink,
    type StyledNavLinkProps,
} from '../Navigation/StyledNavLink';
import { MenubarItem } from '../Menubar';

type MenuLinkItemProps = Omit<StyledNavLinkProps, 'variant'> & {
    icon?: ReactNode;
};

export const MenuLinkItem = ({
    children,
    icon,
    ...props
}: MenuLinkItemProps) => {
    return (
        <MenubarItem asChild>
            <StyledNavLink
                {...props}
                className="font-normal"
                variant="menu"
                icon={icon}
                collapsed={false}
            >
                {children}
            </StyledNavLink>
        </MenubarItem>
    );
};
