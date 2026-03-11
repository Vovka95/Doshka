import { SizeToggle, ThemeToggle } from '@/shared/ui';

export const PreferencesPage = () => {
    return (
        <div className="flex flex-col gap-4 text-sm">
            Preferences
            <div className="flex justify-center">
                <ThemeToggle />
            </div>
            <div className="flex justify-center">
                <SizeToggle />
            </div>
        </div>
    );
};
