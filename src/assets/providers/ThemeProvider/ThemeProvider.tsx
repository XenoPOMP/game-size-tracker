import cn from 'classnames';
import { FC, useEffect } from 'react';

import { ProviderProps } from '@providers/Provider.props';

import useAppSettings from '@hooks/useAppSettings';
import useBodyClassnames from '@hooks/useBodyClassnames';

import styles from './ThemeProvider.module.scss';

const ThemeProvider: FC<ProviderProps> = ({ children }) => {
	const { theme } = useAppSettings();
	const [registerClassnames, deleteClassnames] = useBodyClassnames();

	const classGroupName = 'theme';

	useEffect(() => {
		deleteClassnames(classGroupName);

		registerClassnames(classGroupName, [theme.get()]);
	}, [theme.get()]);

	return <>{children}</>;
};

export default ThemeProvider;
