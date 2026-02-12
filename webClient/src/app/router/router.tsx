import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";

export const router = createBrowserRouter([
    {
        element: <GuestGuard />,
        children: [
            { path: "/login", element: <div>Login</div> },
            { path: "/signup", element: <div>Signup</div> },
        ],
    },
    {
        element: <AuthGuard />,
        children: [
            {
                path: "/",
                element: <div>App</div>,
            },
        ],
    },
    {
        path: "*",
        element: <div>Not found</div>,
    },
]);
