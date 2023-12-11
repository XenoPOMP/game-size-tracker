import cn from 'classnames';
import { FC } from 'react';

import Layout from '@components/Layout/Layout';
import Page from '@components/Page/Page';

import UiContainer from '@ui/UiContainer/UiContainer';

import styles from './SettingsPage.module.scss';
import type { SettingsPageProps } from './SettingsPage.props';

const SettingsPage: FC<SettingsPageProps> = ({}) => {
	return (
		<Page
			meta={{
				title: 'Settings',
				description: '',
			}}
		>
			<UiContainer>Options</UiContainer>
		</Page>
	);
};

export default SettingsPage;
