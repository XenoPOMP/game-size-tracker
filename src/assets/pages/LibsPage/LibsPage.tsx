import axios from 'axios';
import cn from 'classnames';
import { JSONPath } from 'jsonpath-plus';
import { FC } from 'react';
import { useQuery } from 'react-query';

import Page from '@components/Page/Page';

import LibsPageLoader from '@pages/LibsPageLoader/LibsPageLoader';

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

	const { isLoading, data } = useQuery('fetch-owner-libs', async () => {
		const allLibs = await axios.get<{
			objects: Array<{
				package: {
					name: string;
				};
			}>;
		}>('https://registry.npmjs.org/-/v1/search?text=maintainer%3Axeno_pomp');

		return JSONPath({
			path: '$.objects.*.package.name',
			json: allLibs.data,
		}) as string[];
	});

	return (
		<Page meta={loc.meta.libsPage}>
			<UiContainer className={cn(styles.libsPageWrapper)}>
				{isLoading ? (
					<>
						<LibsPageLoader />
					</>
				) : (
					<>
						<GoBack />

						<DependencyList
							myLibs={data}
							deps={deps}
							title={loc.pages.libs.deps}
						/>
						<DependencyList
							myLibs={data}
							deps={devDeps}
							title={loc.pages.libs.devDeps}
						/>
					</>
				)}
			</UiContainer>
		</Page>
	);
};

export default LibsPage;
