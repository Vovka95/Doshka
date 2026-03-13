import type { PropsWithChildren } from 'react';
import { Card } from '../Card';

export const SettingsGroup = ({ children }: PropsWithChildren) => {
    return (
        <Card className="overflow-hidden px-4 shadow-none">
            <div className="divide-y">{children}</div>
        </Card>
    );
};
