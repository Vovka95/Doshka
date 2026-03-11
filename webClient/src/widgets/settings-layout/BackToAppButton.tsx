import { ChevronLeftIcon } from 'lucide-react';

import { SidebarActionButton } from '@/shared/ui';

import { t } from '@/shared/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/config/routes';

type BackToAppButtonProps = {
    collapsed?: boolean;
};

export const BackToAppButton = ({ collapsed }: BackToAppButtonProps) => {
    const navigate = useNavigate();

    return (
        <SidebarActionButton
            variant="ghost"
            size="xs"
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
