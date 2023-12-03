import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { LucideProps, Moon, Sun } from 'lucide-react';
import { FC, ReactNode, useCallback } from 'react';

import FrameButton from '@ui/FrameButton/FrameButton';

import useAppSettings from '@hooks/useAppSettings';

import styles from './ThemeSwitcher.module.scss';
import type { ThemeSwitcherProps } from './ThemeSwitcher.props';

const ThemeSwitcher: VariableFC<
	typeof FrameButton,
	ThemeSwitcherProps,
	'children' | 'onClick'
> = ({ className, ...props }) => {
	const { theme } = useAppSettings();

	const toggleTheme = () => {
		const themeSwitchMap: Record<
			ReturnType<typeof theme.get>,
			ReturnType<typeof theme.get>
		> = {
			dark: 'light',
			light: 'dark',
		};

		theme.set(themeSwitchMap[theme.get()]);
	};

	const getIcon = (currentTheme: ReturnType<typeof theme.get>): ReactNode => {
		const sharedIconProps: LucideProps = {
			width: '100%',
			height: '100%',
		};

		const icons: Record<ReturnType<typeof theme.get>, ReactNode> = {
			dark: (
				<>
					<Moon {...sharedIconProps} />
				</>
			),
			light: (
				<>
					<Sun {...sharedIconProps} />
				</>
			),
		};

		return icons[currentTheme];
	};

	return (
		<FrameButton
			className={cn(styles.switcher, className)}
			onClick={() => {
				toggleTheme();
			}}
			{...props}
		>
			{getIcon(theme.get())}
		</FrameButton>
	);
};

export default ThemeSwitcher;
