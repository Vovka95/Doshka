import { ChevronLeftIcon } from 'lucide-react';

import { Button, IconButton } from '@/shared/ui';

import { t } from '@/shared/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/config/routes';

type BackToAppButtonProps = {
    collapsed?: boolean;
};

export const BackToAppButton = ({ collapsed }: BackToAppButtonProps) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(routes.app());
    };

    return (
        <>
            {collapsed ? (
                <IconButton
                    onClick={handleOnClick}
                    size="lg"
                    variant="ghost"
                    aria-label="Back to app"
                    icon={<ChevronLeftIcon />}
                    className="px-3 w-full justify-start"
                />
            ) : (
                <Button
                    onClick={handleOnClick}
                    size="lg"
                    variant="ghost"
                    aria-label="Back to app"
                    leftIcon={<ChevronLeftIcon />}
                    className="px-3 w-full justify-start"
                >
                    {t('settings.nav.backToApp')}
                </Button>
            )}
        </>
    );
};
