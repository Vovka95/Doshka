import {
    BookmarkCheckIcon,
    BoxIcon,
    FormIcon,
    InboxIcon,
    ListTodoIcon,
} from 'lucide-react';

import { routes } from '@/app/config/routes';

import type { TKey } from '@/shared/lib/i18n';
import { NavGroup, Navigation } from '@/shared/ui';

const navGroups = [
    {
        items: [
            {
                label: 'app.nav.inbox' as TKey,
                to: routes.inbox(),
                icon: InboxIcon,
            },
            {
                label: 'app.nav.myIssues' as TKey,
                to: routes.myIssues(),
                icon: BookmarkCheckIcon,
            },
        ],
    },
    {
        label: 'app.nav.workspace' as TKey,
        items: [
            {
                label: 'app.nav.projects' as TKey,
                to: routes.projects(),
                icon: BoxIcon,
            },
            {
                label: 'app.nav.issues' as TKey,
                to: routes.issues(),
                icon: ListTodoIcon,
            },
            {
                label: 'app.nav.wiki' as TKey,
                to: routes.wiki(),
                icon: FormIcon,
            },
        ],
    },
];

type AppSidebarNavProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

export const AppSidebarNav = ({
    collapsed,
    onNavigate,
}: AppSidebarNavProps) => {
    return (
        <Navigation>
            {navGroups.map((navGroup) => (
                <NavGroup
                    navGroup={navGroup}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />
            ))}
        </Navigation>
    );
};
