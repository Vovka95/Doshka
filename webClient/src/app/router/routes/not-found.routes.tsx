import type { RouteObject } from 'react-router-dom';

import { NotFoundPage } from '@/pages/pages';

export const notFoundRoute: RouteObject = {
    path: '*',
    element: <NotFoundPage />,
};
