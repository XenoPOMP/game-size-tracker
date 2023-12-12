import cn from 'classnames';
import { FC } from 'react';

import Page from '@components/Page/Page';

import GoBack from '@ui/GoBack/GoBack';
import UiContainer from '@ui/UiContainer/UiContainer';

import useLocalization from '@hooks/useLocalization';

import styles from './LibsPage.module.scss';
import type { LibsPageProps } from './LibsPage.props';

const LibsPage: FC<LibsPageProps> = ({}) => {
	const loc = useLocalization();

	return (
		<Page meta={loc.meta.libsPage}>
			<UiContainer className={cn(styles.libsPageWrapper)}>
				<GoBack />
			</UiContainer>
		</Page>
	);
};

export default LibsPage;
