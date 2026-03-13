import { Settings2Icon, UserKeyIcon, UserPenIcon } from 'lucide-react';

import { NavGroup, Navigation, Sidebar, SidebarHeader } from '@/shared/ui';

import type { TKey } from '@/shared/lib/i18n';

import { routes } from '@/app/config/routes';
import { BackToAppButton } from './BackToAppButton';

type SettingsSidebarProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

export const SettingsSidebar = ({
    collapsed,
    onNavigate,
}: SettingsSidebarProps) => {
    return (
        <Sidebar>
            <SidebarHeader>
                <BackToAppButton collapsed={collapsed} />
            </SidebarHeader>
            <Navigation>
                {navGroups.map((navGroup) => (
                    <NavGroup
                        key={`navGroup-${navGroup.items[0].to}`}
                        navGroup={navGroup}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                    />
                ))}
            </Navigation>
        </Sidebar>
    );
};

const navGroups = [
    {
        items: [
            {
                label: 'settings.nav.preferences' as TKey,
                to: routes.preferences(),
                icon: Settings2Icon,
            },
            {
                label: 'settings.nav.profile' as TKey,
                to: routes.profile(),
                icon: UserPenIcon,
            },
            {
                label: 'settings.nav.security' as TKey,
                to: routes.security(),
                icon: UserKeyIcon,
            },
        ],
    },
];
