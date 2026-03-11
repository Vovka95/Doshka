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

const navLinkIconSize = 20;

export const NavGroup = ({
    navGroup,
    collapsed,
    onNavigate,
}: NavGroupProps) => {
    return (
        <div className="flex flex-col gap-0.5 mb-4">
            {navGroup.label && (
                <NavGroupLabel size="xs" collapsed={collapsed}>
                    {t(navGroup.label)}
                </NavGroupLabel>
            )}
            {navGroup.items.map((item) => {
                const Icon = item.icon;
                return (
                    <StyledNavLink
                        size="xs"
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
        </div>
    );
};
