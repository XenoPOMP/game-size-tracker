import cn from 'classnames';
import { FC } from 'react';

import Options from '@pages/SettingsPage/Options/Options';

import { AppSettings } from '@redux/reducers/appSettingsSlice';

import useAppSettings from '@hooks/useAppSettings';
import useLocalization from '@hooks/useLocalization';

import styles from './AppearanceSettings.module.scss';
import type { AppearanceSettingsProps } from './AppearanceSettings.props';

const AppearanceSettings: FC<AppearanceSettingsProps> = ({}) => {
	const loc = useLocalization();
	const { theme } = useAppSettings();

	return (
		<>
			<Options.Group>
				<Options.Header>
					{loc.pages.options.groups.appearance.title}
				</Options.Header>

				<Options.Items>
					<Options.Select
						initialValue={theme.get()}
						title={'Theme:'}
						options={[
							{
								option: 'dark',
								displayingName: 'Dark theme',
							},
							{
								option: 'light',
								displayingName: 'Light theme',
							},
						]}
						onSelect={val => {
							theme.set(val as AppSettings['theme']);
						}}
					/>
				</Options.Items>
			</Options.Group>
		</>
	);
};

export default AppearanceSettings;
