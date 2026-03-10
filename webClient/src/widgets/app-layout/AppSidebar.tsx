import {
    BookmarkCheckIcon,
    BoxIcon,
    FormIcon,
    InboxIcon,
    ListTodoIcon,
} from 'lucide-react';

import { Sidebar, SidebarHeader, NavGroup, Navigation } from '@/shared/ui';
import { WorkspaceMenu } from './WorkspaceMenu';

import type { TKey } from '@/shared/lib/i18n';

import { routes } from '@/app/config/routes';

type AppSidebarProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

export const AppSidebar = ({
    collapsed = false,
    onNavigate,
}: AppSidebarProps) => {
    return (
        <Sidebar>
            <SidebarHeader>
                <WorkspaceMenu onNavigate={onNavigate} collapsed={collapsed} />
            </SidebarHeader>
            <Navigation>
                {navGroups.map((navGroup) => (
                    <NavGroup
                        key={`navGroup-${navGroup.label ?? navGroup.items[0].to}`}
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
