import { Navigate, type RouteObject } from 'react-router-dom';

import { AuthGuard } from '@/features/auth/ui';
import { AppLayout } from '@/widgets/app-layout';

import {
    InboxPage,
    IssuesPage,
    MyIssuesPage,
    ProjectsPage,
    WikiPage,
} from '@/pages/pages';

export const appRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                path: 'app',
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="my-issues" replace />,
                    },
                    { path: 'my-issues', element: <MyIssuesPage /> },
                    { path: 'inbox', element: <InboxPage /> },
                    { path: 'projects', element: <ProjectsPage /> },
                    { path: 'issues', element: <IssuesPage /> },
                    { path: 'wiki', element: <WikiPage /> },
                ],
            },
        ],
    },
];
