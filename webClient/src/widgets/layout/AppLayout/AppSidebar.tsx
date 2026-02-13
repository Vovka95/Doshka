import { NavLink } from "react-router-dom";

import { routes } from "@/app/config/routes";

const linkBase =
    "flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition hover:bg-hover";
const linkActive = "bg-selected";

export const AppSidebar = () => {
    return (
        <aside>
            <div className="p-4">
                <div className="text-sm font-semibold">Doshka</div>
                <div className="mt-1 text-xs text-muted-fg">Workspace</div>
            </div>

            <nav className="px-2 pb-4">
                <NavLink
                    to={routes.inbox()}
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : ""}`
                    }
                >
                    Inbox
                </NavLink>
                <NavLink
                    to={routes.myIssues()}
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : ""}`
                    }
                >
                    My issues
                </NavLink>

                <div className="mt-4 px-3 text-xs font-medium text-muted-fg">
                    Workspace
                </div>
                <NavLink
                    to={routes.projects()}
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : ""}`
                    }
                >
                    Projects
                </NavLink>
                <NavLink
                    to={routes.issues()}
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : ""}`
                    }
                >
                    Issues
                </NavLink>
                <NavLink
                    to={routes.wiki()}
                    className={({ isActive }) =>
                        `${linkBase} ${isActive ? linkActive : ""}`
                    }
                >
                    Wiki
                </NavLink>
            </nav>
        </aside>
    );
};
