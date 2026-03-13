import { cn } from '@/shared/lib/cn';

export type NavGroupLabelSize = 'xs' | 'sm' | 'md' | 'lg';

type NavGroupLabelProps = {
    size?: NavGroupLabelSize;
    children: React.ReactNode;
    collapsed?: boolean;
};

const sizes: Record<NavGroupLabelSize, string> = {
    xs: 'h-6 text-xs',
    sm: 'h-8 text-sm',
    md: 'h-9 text-sm',
    lg: 'h-10 text-sm',
};

export const NavGroupLabel = ({
    size = 'sm',
    collapsed,
    children,
}: NavGroupLabelProps) => {
    return (
        <div
            className={cn(
                'min-w-0 font-medium text-muted-fg px-3 origin-left transition-all duration-200 ease-in-out',
                sizes[size],
                collapsed ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100',
            )}
        >
            <span className="truncate">{children}</span>
        </div>
    );
};
