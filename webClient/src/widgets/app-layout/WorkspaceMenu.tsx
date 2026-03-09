import { ChevronDown } from 'lucide-react';

import {
    Button,
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
    MenuActionItem,
    MenuLinkItem,
    IconButton,
} from '@/shared/ui';

import { routes } from '@/app/config/routes';
import { WorkspaceAvatar } from '@/shared/ui/Avatar';

type WorkspaceMenuProps = {
    collapsed?: boolean;
    onNavigate?: () => void;
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
                            icon={<WorkspaceAvatar size="xs" name={'Doshka'} />}
                            className="px-3 w-full justify-start"
                        />
                    ) : (
                        <Button
                            size="lg"
                            variant="ghost"
                            aria-label="Open side menu"
                            leftIcon={
                                <WorkspaceAvatar size="xs" name={'Doshka'} />
                            }
                            rightIcon={<ChevronDown size={16} />}
                            className="px-3 w-full justify-start"
                        >
                            Doshka
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
                    <MenuLinkItem to={routes.inbox()}>Test</MenuLinkItem>
                    <MenubarItem>Test</MenubarItem>
                    <MenubarSeparator />
                    <MenuActionItem>Log out</MenuActionItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
