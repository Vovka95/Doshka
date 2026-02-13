import {
    BookmarkCheckIcon,
    BoxIcon,
    FormIcon,
    InboxIcon,
    ListTodoIcon,
} from "lucide-react";

import { routes } from "@/app/config/routes";

import { StyledNavLink } from "@/shared/ui/Navigation";
import { cn } from "@/shared/lib/cn";

const navLinkIconSize = 20;

type AppSidebarProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

export const AppSidebar = ({
    collapsed = false,
    onNavigate,
}: AppSidebarProps) => {
    return (
        <aside className="h-dvh overflow-hidden">
            <div className="p-4 h-20">
                {collapsed ? (
                    <div className="text-center text-sm font-semibold">D</div>
                ) : (
                    <>
                        <div className="text-sm font-semibold">Doshka</div>
                        <div className="mt-1 text-xs text-muted-fg">
                            Workspace
                        </div>
                    </>
                )}
            </div>

            <nav className="px-2 pb-4">
                <StyledNavLink
                    to={routes.inbox()}
                    icon={<InboxIcon size={navLinkIconSize} />}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Inbox
                </StyledNavLink>
                <StyledNavLink
                    to={routes.myIssues()}
                    icon={<BookmarkCheckIcon size={navLinkIconSize} />}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    My issues
                </StyledNavLink>

                <div
                    className={cn(
                        "mt-4 px-3 text-xs font-medium text-muted-fg",
                        collapsed && "overflow-hidden opacity-0",
                    )}
                >
                    Workspace
                </div>

                <StyledNavLink
                    to={routes.projects()}
                    icon={<BoxIcon size={navLinkIconSize} />}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Projects
                </StyledNavLink>
                <StyledNavLink
                    to={routes.issues()}
                    icon={<ListTodoIcon size={navLinkIconSize} />}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Issues
                </StyledNavLink>
                <StyledNavLink
                    to={routes.wiki()}
                    icon={<FormIcon size={navLinkIconSize} />}
                    collapsed={collapsed}
                    onClick={onNavigate}
                >
                    Wiki
                </StyledNavLink>
            </nav>
        </aside>
    );
};
