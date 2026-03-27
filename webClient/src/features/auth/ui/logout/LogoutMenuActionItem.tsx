import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { authSession } from '../../lib/authSession';
import { useLogoutMutation } from '../../model';

import { routes } from '@/app/config/routes';
import { MenuActionItem, type MenuActionItemProps } from '@/shared/ui';
import { t } from '@/shared/lib/i18n';

type LogoutMenuActionItemProps = Omit<MenuActionItemProps, 'children'>;

export const LogoutMenuActionItem = ({
    ...props
}: LogoutMenuActionItemProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logoutMutation = useLogoutMutation();

    const handleOnClick = async () => {
        authSession.startLogout(queryClient);
        navigate(routes.login(), { replace: true });

        try {
            await logoutMutation.mutateAsync();
        } finally {
            authSession.finishLogout();
        }
    };

    return (
        <MenuActionItem
            {...props}
            onClick={handleOnClick}
            disabled={logoutMutation.isPending}
        >
            {t('auth.logout.button.idle')}
        </MenuActionItem>
    );
};
