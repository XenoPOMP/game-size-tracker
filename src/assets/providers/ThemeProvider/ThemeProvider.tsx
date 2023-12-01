import cn from 'classnames';
import { FC } from 'react';

import { ProviderProps } from '@providers/Provider.props';

import styles from './ThemeProvider.module.scss';

const ThemeProvider: FC<ProviderProps> = ({ children }) => {
	return <>{children}</>;
};

export default ThemeProvider;
