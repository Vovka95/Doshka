import type { LucideIcon } from 'lucide-react';

import { NavGroupLabel } from './NavGroupLabel';
import { StyledNavLink } from './StyledNavLink';

import { t, type TKey } from '@/shared/lib/i18n';

type NavGroupType = {
    label?: TKey;
    items: { label: TKey; to: string; icon: LucideIcon }[];
};

type NavGroupProps = {
    navGroup: NavGroupType;
    collapsed?: boolean;
    onNavigate?: () => void;
};

const navLinkIconSize = 24;

export const NavGroup = ({
    navGroup,
    collapsed,
    onNavigate,
}: NavGroupProps) => {
    return (
        <>
            {navGroup.label && (
                <NavGroupLabel collapsed={collapsed}>
                    {t(navGroup.label)}
                </NavGroupLabel>
            )}
            {navGroup.items.map((item) => {
                const Icon = item.icon;
                return (
                    <StyledNavLink
                        key={item.to}
                        to={item.to}
                        icon={<Icon size={navLinkIconSize} />}
                        collapsed={collapsed}
                        onClick={onNavigate}
                    >
                        {t(item.label)}
                    </StyledNavLink>
                );
            })}
        </>
    );
};
