import { cn } from '@/shared/lib/cn';

type NavGroupLabelProps = {
    children: React.ReactNode;
    collapsed?: boolean;
};

export const NavGroupLabel = ({ collapsed, children }: NavGroupLabelProps) => {
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
