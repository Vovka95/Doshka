import type { PropsWithChildren } from 'react';

export const SettingsPageLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
            {children}
        </div>
    );
};
