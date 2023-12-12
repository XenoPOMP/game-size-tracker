import cn from 'classnames';
import { MoveLeft } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import Page from '@components/Page/Page';

import AppearanceSettings from '@pages/SettingsPage/AppearanceSettings/AppearanceSettings';
import LocalizationSettings from '@pages/SettingsPage/LocalizationSettings/LocalizationSettings';
import Options from '@pages/SettingsPage/Options/Options';
import ReportSettings from '@pages/SettingsPage/ReportSettings/ReportSettings';

import UiContainer from '@ui/UiContainer/UiContainer';

import useAppSettings from '@hooks/useAppSettings';
import useLocalization from '@hooks/useLocalization';

import { inlineLocalizationVar } from '@utils/inlineLocalizationVar';

import styles from './SettingsPage.module.scss';
import type { SettingsPageProps } from './SettingsPage.props';

const SettingsPage: FC<SettingsPageProps> = ({}) => {
	const loc = useLocalization();
	const { appVersion } = useAppSettings();

	return (
		<Page meta={loc.meta.optionsPage}>
			<UiContainer className={cn(styles.optionsPageWrapper)}>
				<Link to={'/'} className={cn(styles.goBack)}>
					<MoveLeft width={'.9em'} />
					{loc.pages.options.goBack}
				</Link>

				<Options className={cn(styles.options)}>
					<AppearanceSettings />

					<LocalizationSettings />

					<ReportSettings />
				</Options>

				<div className={cn(styles.version)}>
					{inlineLocalizationVar(loc.pages.options.version, {
						VERSION: appVersion.get(),
					})}
				</div>
			</UiContainer>
		</Page>
	);
};

export default SettingsPage;
