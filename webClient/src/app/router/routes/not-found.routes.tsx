import type { RouteObject } from "react-router-dom";

const NotFoundPage = () => <div className="text-sm">Not found</div>;

export const notFoundRoute: RouteObject = {
    path: "*",
    element: <NotFoundPage />,
};
