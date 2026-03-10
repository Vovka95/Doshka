import type { PropsWithChildren } from 'react';

type SidebarMobileProps = PropsWithChildren & {
    onClose: () => void;
};

export const SidebarMobile = ({ children, onClose }: SidebarMobileProps) => {
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute inset-y-0 left-0 w-70 bg-card shadow-xl">
                {children}
            </div>
        </div>
    );
};
