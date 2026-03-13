import { Navigate, type RouteObject } from 'react-router-dom';

import { AuthGuard } from '@/features/auth/ui';
import { SettingsLayout } from '@/widgets/settings-layout';

import { PreferencesPage } from '@/pages/settings';
import { ProfilePage, SecurityPage } from '@/pages/pages';

export const settingsRoutes: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
            {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="preferences" replace />,
                    },
                    { path: 'preferences', element: <PreferencesPage /> },
                    { path: 'profile', element: <ProfilePage /> },
                    { path: 'security', element: <SecurityPage /> },
                ],
            },
        ],
    },
];
