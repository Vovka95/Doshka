import { ChevronDown } from 'lucide-react';

import { LogoutMenuActionItem } from '@/features/auth/ui';

import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
    MenuLinkItem,
    SidebarActionButton,
} from '@/shared/ui';
import { WorkspaceAvatar } from '@/shared/ui/Avatar';

import { routes } from '@/app/config/routes';

import { t } from '@/shared/lib/i18n';

type WorkspaceMenuProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
};

const TestWorspaceData = {
    name: 'Doshka',
};

export const WorkspaceMenu = ({
    collapsed,
    onNavigate,
}: WorkspaceMenuProps) => {
    return (
        <Menubar className="w-full">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <SidebarActionButton
                        variant="ghost"
                        size="xs"
                        collapsed={collapsed}
                        aria-label="Open side menu"
                        leftIcon={
                            <WorkspaceAvatar
                                size="xs"
                                name={TestWorspaceData.name}
                            />
                        }
                        rightIcon={<ChevronDown size={16} />}
                        className="bg-hover"
                    >
                        {TestWorspaceData.name}
                    </SidebarActionButton>
                </MenubarTrigger>
                <MenubarContent
                    className="min-w-57"
                    align="start"
                    sideOffset={5}
                    alignOffset={0}
                    onClick={onNavigate}
                >
                    <MenuLinkItem to={routes.settings()}>
                        {t('app.workspace.menu.settings')}
                    </MenuLinkItem>
                    <MenubarSeparator />
                    <LogoutMenuActionItem />
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
