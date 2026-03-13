import type { ReactNode } from 'react';

type SettingsSectionProps = {
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
};

export const SettingsSection = ({
    title,
    description,
    children,
}: SettingsSectionProps) => {
    return (
        <section className="space-y-3">
            <div>
                <h2 className="text-lg font-medium">{title}</h2>

                {description ? (
                    <p className="mt-1 text-sm text-muted-fg">{description}</p>
                ) : null}
            </div>

            {children}
        </section>
    );
};
