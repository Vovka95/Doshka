import { cn } from '@/shared/lib/cn';

type SidebarNavGroupLabelProps = {
    children: React.ReactNode;
    collapsed?: boolean;
};

export const AppSidebarNavGroupLabel = ({
    collapsed,
    children,
}: SidebarNavGroupLabelProps) => {
    return (
        <div
            className={cn(
                'mt-4 px-3 text-xs font-medium text-muted-fg',
                collapsed && 'overflow-hidden opacity-0',
            )}
        >
            {children}
        </div>
    );
};
