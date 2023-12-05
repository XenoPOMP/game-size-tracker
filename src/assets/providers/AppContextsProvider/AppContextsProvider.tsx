import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC, Fragment } from 'react';

import { LoadingContextProvider } from '@contexts/Loading.context';

import styles from './AppContextsProvider.module.scss';
import type { AppContextsProviderProps } from './AppContextsProvider.props';

const AppContextsProvider: VariableFC<
	typeof Fragment,
	AppContextsProviderProps
> = ({ children, ...props }) => {
	return (
		<>
			<LoadingContextProvider>
				<>{children}</>
			</LoadingContextProvider>
		</>
	);
};

export default AppContextsProvider;
