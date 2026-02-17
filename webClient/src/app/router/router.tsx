import { createBrowserRouter } from "react-router-dom";
import { authRoutes, appRoutes, notFoundRoute } from "./routes";

export const router = createBrowserRouter([
    ...authRoutes,
    ...appRoutes,
    notFoundRoute,
]);
