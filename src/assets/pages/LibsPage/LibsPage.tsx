import cn from 'classnames';
import { FC } from 'react';

import Page from '@components/Page/Page';

import DependencyList from '@ui/DependencyList/DependencyList';
import GoBack from '@ui/GoBack/GoBack';
import UiContainer from '@ui/UiContainer/UiContainer';

import useLocalization from '@hooks/useLocalization';

import styles from './LibsPage.module.scss';
import type { LibsPageProps } from './LibsPage.props';
import pkg from '@/../package.json';

const LibsPage: FC<LibsPageProps> = ({}) => {
	const loc = useLocalization();

	const deps = pkg.dependencies;
	const devDeps = pkg.devDependencies;

	return (
		<Page meta={loc.meta.libsPage}>
			<UiContainer className={cn(styles.libsPageWrapper)}>
				<GoBack />

				<DependencyList deps={deps} title={'Deps'} />
				<DependencyList deps={devDeps} title={'Dev deps'} />
			</UiContainer>
		</Page>
	);
};

export default LibsPage;
