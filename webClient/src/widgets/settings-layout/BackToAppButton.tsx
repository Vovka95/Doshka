import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

import { SidebarActionButton } from '@/shared/ui';

import { useUIStore } from '@/shared/store/ui';

import { t } from '@/shared/lib/i18n';
import { routes } from '@/app/config/routes';

type BackToAppButtonProps = {
    collapsed?: boolean;
};

export const BackToAppButton = ({ collapsed }: BackToAppButtonProps) => {
    const appSize = useUIStore((s) => s.size);
    const navigate = useNavigate();

    return (
        <SidebarActionButton
            variant="ghost"
            size={appSize}
            collapsed={collapsed}
            onClick={() => navigate(routes.app())}
            leftIcon={<ChevronLeftIcon size={16} />}
            className="bg-hover"
            aria-label={t('settings.nav.backToApp')}
        >
            {t('settings.nav.backToApp')}
        </SidebarActionButton>
    );
};
