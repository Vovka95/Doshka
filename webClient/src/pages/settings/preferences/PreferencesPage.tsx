import { ThemeToggle } from '@/shared/ui';

export const PreferencesPage = () => {
    return (
        <div className="flex flex-col gap-4 text-sm">
            Preferences
            <div className="flex justify-center">
                <ThemeToggle />
            </div>
        </div>
    );
};
