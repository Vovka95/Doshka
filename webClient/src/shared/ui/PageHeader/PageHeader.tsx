import type { ReactNode } from 'react';

type PageHeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
};

export const PageHeader = ({
    title,
    description,
    actions,
}: PageHeaderProps) => {
    return (
        <header className="flex items-center justify-between gap-4">
            <div className="min-w-0">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-sm text-muted-fg">{description}</p>
                )}
            </div>

            {actions && <div className="shrink-0">{actions}</div>}
        </header>
    );
};
