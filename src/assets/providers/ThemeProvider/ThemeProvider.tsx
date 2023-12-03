import cn from 'classnames';
import { FC } from 'react';

import { ProviderProps } from '@providers/Provider.props';

import useAppSettings from '@hooks/useAppSettings';

import styles from './ThemeProvider.module.scss';

const ThemeProvider: FC<ProviderProps> = ({ children }) => {
	const { theme } = useAppSettings();

	return <>{children}</>;
};

export default ThemeProvider;
