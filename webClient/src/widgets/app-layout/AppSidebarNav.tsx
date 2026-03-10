import {
    BookmarkCheckIcon,
    BoxIcon,
    FormIcon,
    InboxIcon,
    ListTodoIcon,
} from 'lucide-react';

import { AppSidebarNavGroup } from './AppSidebarNavGroup';

import { routes } from '@/app/config/routes';

const navGroups = [
    {
        items: [
            { label: 'app.nav.inbox', to: routes.inbox(), icon: InboxIcon },
            {
                label: 'app.nav.myIssues',
                to: routes.myIssues(),
                icon: BookmarkCheckIcon,
            },
        ],
    },
    {
        label: 'app.nav.workspace',
        items: [
            { label: 'app.nav.projects', to: routes.projects(), icon: BoxIcon },
            {
                label: 'app.nav.issues',
                to: routes.issues(),
                icon: ListTodoIcon,
            },
            { label: 'app.nav.wiki', to: routes.wiki(), icon: FormIcon },
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
        <nav className="px-2 pb-4">
            {navGroups.map((navGroup) => (
                <AppSidebarNavGroup
                    navGroup={navGroup}
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />
            ))}
        </nav>
    );
};
