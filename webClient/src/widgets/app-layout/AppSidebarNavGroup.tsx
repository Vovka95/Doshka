import type { LucideIcon } from 'lucide-react';

import { AppSidebarNavGroupLabel } from './AppSidebarNavGroupLabel';
import { StyledNavLink } from '@/shared/ui';

import { tUnsafe } from '@/shared/lib/i18n';

type NavGroupType = {
    label?: string;
    items: { label: string; to: string; icon: LucideIcon }[];
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
                    {tUnsafe(navGroup.label)}
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
                        {tUnsafe(item.label)}
                    </StyledNavLink>
                );
            })}
        </>
    );
};
