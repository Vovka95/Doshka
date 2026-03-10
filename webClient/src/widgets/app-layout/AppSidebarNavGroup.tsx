import type { LucideIcon } from 'lucide-react';

import { AppSidebarNavGroupLabel } from './AppSidebarNavGroupLabel';
import { StyledNavLink } from '@/shared/ui';

import { t, type TKey } from '@/shared/lib/i18n';

type NavGroupType = {
    label?: TKey;
    items: { label: TKey; to: string; icon: LucideIcon }[];
};

type AppSidebarNavGroupProps = {
    navGroup: NavGroupType;
    collapsed?: boolean;
    onNavigate?: () => void;
};

const navLinkIconSize = 24;

export const AppSidebarNavGroup = ({
    navGroup,
    collapsed,
    onNavigate,
}: AppSidebarNavGroupProps) => {
    return (
        <>
            {navGroup.label && (
                <AppSidebarNavGroupLabel collapsed={collapsed}>
                    {t(navGroup.label)}
                </AppSidebarNavGroupLabel>
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
