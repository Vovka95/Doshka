import { SidebarHeader } from '@/shared/ui';
import { WorkspaceMenu } from './WorkspaceMenu';

type AppSidebarHeaderProps = {
    onNavigate?: () => void;
    collapsed?: boolean;
};

export const AppSidebarHeader = ({
    collapsed,
    onNavigate,
}: AppSidebarHeaderProps) => {
    return (
        <SidebarHeader>
            <WorkspaceMenu onNavigate={onNavigate} collapsed={collapsed} />
        </SidebarHeader>
    );
};
