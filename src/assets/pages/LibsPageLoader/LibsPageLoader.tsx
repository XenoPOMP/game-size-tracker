import { PropsWith } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import DependencyList from '@ui/DependencyList/DependencyList';
import GoBack from '@ui/GoBack/GoBack';

import styles from './LibsPageLoader.module.scss';
import type { LibsPageLoaderProps } from './LibsPageLoader.props';

const LibsPageLoader: FC<LibsPageLoaderProps> = ({}) => {
	return (
		<>
			<GoBack.Loader />

			<DependencyList.Loader />
			<DependencyList.Loader />
		</>
	);
};

export default LibsPageLoader;
