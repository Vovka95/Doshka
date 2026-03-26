import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { authSession } from '../../lib/authSession';
import { useLogoutMutation } from '../../model';

import { routes } from '@/app/config/routes';
import { MenuActionItem, type MenuActionItemProps } from '@/shared/ui';
import { useUIStore } from '@/shared/store/ui';
import { normalizeApiError } from '@/shared/api/http/errror';
import { t } from '@/shared/lib/i18n';

type LogoutMenuActionItemProps = Omit<MenuActionItemProps, 'children'>;

export const LogoutMenuActionItem = ({
    ...props
}: LogoutMenuActionItemProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const toast = useUIStore((s) => s.toast);
    const logoutMutation = useLogoutMutation();

    const handleOnClick = async () => {
        try {
            await logoutMutation.mutateAsync();

            toast({
                variant: 'success',
                title: t('auth.logout.toast.success.title'),
                message: t('auth.logout.toast.success.message'),
            });
        } catch (error) {
            const apiError = normalizeApiError(error);

            toast({
                variant: 'error',
                title: t('auth.logout.toast.error.title'),
                message: apiError.messages[0],
            });
        } finally {
            authSession.clear(queryClient);
            navigate(routes.login(), { replace: true });
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
