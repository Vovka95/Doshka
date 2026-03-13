import {
    PageHeader,
    SettingsSection,
    SettingsGroup,
    SettingsRow,
    ThemeToggle,
    SizeToggle,
} from '@/shared/ui';
import { SettingsPageLayout } from '@/widgets/settings-layout';

export const PreferencesPage = () => {
    return (
        <SettingsPageLayout>
            <PageHeader title="Preferences" />

            <SettingsSection title="Interface and theme">
                <SettingsGroup>
                    <SettingsRow
                        title="Font size"
                        description="Adjust the size of text across the app"
                        control={<SizeToggle />}
                    />

                    <SettingsRow
                        title="Interface theme"
                        description="Select or customize your interface color scheme"
                        control={<ThemeToggle />}
                    />
                </SettingsGroup>
            </SettingsSection>
        </SettingsPageLayout>
    );
};
