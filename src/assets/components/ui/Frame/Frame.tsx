import cn from 'classnames';
import { FC } from 'react';

import FullscreenStateProvider from '@contexts/FullscreenState.context';

import ControlButton from '@ui/Frame/ControlButton/ControlButton';
import ThemeSwitcher from '@ui/ThemeSwitcher/ThemeSwitcher';

import useAppSettings from '@hooks/useAppSettings';

import styles from './Frame.module.scss';
import type { FrameProps } from './Frame.props';

/**
 * Application frame with traffic lights.
 *
 * @constructor
 */
const Frame: FC<FrameProps> = ({}) => {
	const { appName } = useAppSettings();

	return (
		<header className={cn(styles.appFrame)}>
			<section className={cn(styles.controls)}>
				<ThemeSwitcher />
			</section>

			<FullscreenStateProvider>
				<section className={cn(styles.trafficLights, styles.controls)}>
					<ControlButton action={'minimize'} />

					<ControlButton action={'maximize'} />

					<ControlButton action={'close'} />
				</section>
			</FullscreenStateProvider>
		</header>
	);
};

export default Frame;
