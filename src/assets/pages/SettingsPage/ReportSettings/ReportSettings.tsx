import cn from 'classnames';
import { FC } from 'react';

import Options from '@pages/SettingsPage/Options/Options';

import ExternalLink from '@ui/ExternalLink/ExternalLink';
import LanguageSwitcher from '@ui/LanguageSwitcher/LanguageSwitcher';

import useLocalization from '@hooks/useLocalization';

import styles from './ReportSettings.module.scss';
import type { ReportSettingsProps } from './ReportSettings.props';

const ReportSettings: FC<ReportSettingsProps> = ({}) => {
	const loc = useLocalization();

	return (
		<>
			<Options.Group>
				<Options.Header>{loc.pages.options.groups.report.title}</Options.Header>

				<Options.Items>
					<ExternalLink
						applyStyles
						className={cn('text-[.85em]')}
						to={'https://github.com/XenoPOMP/game-size-tracker/issues/new'}
					>
						{loc.pages.options.groups.report.foundBug}
					</ExternalLink>
				</Options.Items>
			</Options.Group>
		</>
	);
};

export default ReportSettings;
