import {
    BookmarkCheckIcon,
    BoxIcon,
    FormIcon,
    InboxIcon,
    ListTodoIcon,
} from "lucide-react";

import { routes } from "@/app/config/routes";

import { StyledNavLink } from "@/shared/ui/Navigation";

const navLinkIconSize = 20;

export const AppSidebar = () => {
    return (
        <aside>
            <div className="p-4">
                <div className="text-sm font-semibold">Doshka</div>
                <div className="mt-1 text-xs text-muted-fg">Workspace</div>
            </div>

            <nav className="px-2 pb-4">
                <StyledNavLink
                    to={routes.inbox()}
                    icon={<InboxIcon size={navLinkIconSize} />}
                >
                    Inbox
                </StyledNavLink>
                <StyledNavLink
                    to={routes.myIssues()}
                    icon={<BookmarkCheckIcon size={navLinkIconSize} />}
                >
                    My issues
                </StyledNavLink>

                <div className="mt-4 px-3 text-sm font-medium text-muted-fg">
                    Workspace
                </div>
                <StyledNavLink
                    to={routes.projects()}
                    icon={<BoxIcon size={navLinkIconSize} />}
                >
                    Projects
                </StyledNavLink>
                <StyledNavLink
                    to={routes.issues()}
                    icon={<ListTodoIcon size={navLinkIconSize} />}
                >
                    Issues
                </StyledNavLink>
                <StyledNavLink
                    to={routes.wiki()}
                    icon={<FormIcon size={navLinkIconSize} />}
                >
                    Wiki
                </StyledNavLink>
            </nav>
        </aside>
    );
};
