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
        <div className="px-2 pb-2 shrink-0">
            <WorkspaceMenu onNavigate={onNavigate} collapsed={collapsed} />
        </div>
    );
};
