import type { ReactNode } from 'react';

type SettingsRowProps = {
    title: ReactNode;
    description?: ReactNode;
    control: ReactNode;
};

export const SettingsRow = ({
    title,
    description,
    control,
}: SettingsRowProps) => {
    return (
        <div className="flex items-start justify-between gap-6 py-4">
            <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{title}</div>

                {description ? (
                    <p className="mt-1 text-sm text-muted-fg">{description}</p>
                ) : null}
            </div>

            <div className="shrink-0">{control}</div>
        </div>
    );
};
