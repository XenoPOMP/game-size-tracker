import cn from 'classnames';
import { FC } from 'react';

import Options from '@pages/SettingsPage/Options/Options';

import { AppSettings } from '@redux/reducers/appSettingsSlice';

import LanguageSwitcher from '@ui/LanguageSwitcher/LanguageSwitcher';

import useAppSettings from '@hooks/useAppSettings';
import useLocalization from '@hooks/useLocalization';

import styles from './LocalizationSettings.module.scss';
import type { LocalizationSettingsProps } from './LocalizationSettings.props';

const LocalizationSettings: FC<LocalizationSettingsProps> = ({}) => {
	const loc = useLocalization();

	return (
		<>
			<Options.Group>
				<Options.Header>
					{loc.pages.options.groups.language.title}
				</Options.Header>

				<Options.Items>
					<LanguageSwitcher className={cn('!h-[1.5em]')} />
				</Options.Items>
			</Options.Group>
		</>
	);
};

export default LocalizationSettings;
