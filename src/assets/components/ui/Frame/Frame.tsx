import cn from 'classnames';
import { Bug } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import FullscreenStateProvider from '@contexts/FullscreenState.context';

import ControlButton from '@ui/Frame/ControlButton/ControlButton';
import FrameButton from '@ui/FrameButton/FrameButton';
import LanguageSwitcher from '@ui/LanguageSwitcher/LanguageSwitcher';
import ThemeSwitcher from '@ui/ThemeSwitcher/ThemeSwitcher';

import useAppSettings from '@hooks/useAppSettings';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

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
				<FrameButton
					onClick={() => {
						let ignore = sendMessage<never>(
							'open-in-external-browser',
							'https://github.com/XenoPOMP/game-size-tracker/issues/new'
						);
					}}
				>
					<Bug width={'100%'} height={'100%'} />
				</FrameButton>

				<LanguageSwitcher />

				{/*<ThemeSwitcher />*/}
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
