import type { LucideIcon } from 'lucide-react';

import { NavGroupLabel } from './NavGroupLabel';
import { StyledNavLink } from './StyledNavLink';

import { t, type TKey } from '@/shared/lib/i18n';

import { useUIStore } from '@/shared/store/ui';

type NavGroupType = {
    label?: TKey;
    items: { label: TKey; to: string; icon: LucideIcon }[];
};

type NavGroupProps = {
    navGroup: NavGroupType;
    collapsed?: boolean;
    onNavigate?: () => void;
};

const iconSize = 24;

export const NavGroup = ({
    navGroup,
    collapsed,
    onNavigate,
}: NavGroupProps) => {
    const appSize = useUIStore((s) => s.size);

    return (
        <div className="flex flex-col gap-0.5 mb-4">
            {navGroup.label && (
                <NavGroupLabel size={appSize} collapsed={collapsed}>
                    {t(navGroup.label)}
                </NavGroupLabel>
            )}
            {navGroup.items.map((item) => {
                const Icon = item.icon;
                return (
                    <StyledNavLink
                        size={appSize}
                        key={item.to}
                        to={item.to}
                        icon={<Icon size={iconSize} />}
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
