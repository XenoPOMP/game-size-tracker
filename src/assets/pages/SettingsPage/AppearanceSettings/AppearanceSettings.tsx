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
						title={loc.pages.options.groups.appearance.options.theme.name}
						options={[
							{
								option: 'dark',
								displayingName:
									loc.pages.options.groups.appearance.options.theme.options
										.dark,
							},
							{
								option: 'light',
								displayingName:
									loc.pages.options.groups.appearance.options.theme.options
										.light,
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
