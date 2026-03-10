import { ChevronDown } from 'lucide-react';

import { LogoutMenuActionItem } from '@/features/auth/ui';

import {
    Button,
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
    MenuLinkItem,
    IconButton,
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
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger asChild>
                    {collapsed ? (
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="Open side menu"
                            icon={
                                <WorkspaceAvatar
                                    size="xs"
                                    name={TestWorspaceData.name}
                                />
                            }
                            className="px-3 w-full justify-start"
                        />
                    ) : (
                        <Button
                            size="lg"
                            variant="ghost"
                            aria-label="Open side menu"
                            leftIcon={
                                <WorkspaceAvatar
                                    size="xs"
                                    name={TestWorspaceData.name}
                                />
                            }
                            rightIcon={<ChevronDown size={16} />}
                            className="px-3 w-full justify-start"
                        >
                            {TestWorspaceData.name}
                        </Button>
                    )}
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
