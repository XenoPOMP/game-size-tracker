import cn from 'classnames';
import { ipcRenderer } from 'electron';
import { LucideProps, Maximize2, Minimize2, Minus, X } from 'lucide-react';
import { ComponentProps, FC, useContext, useState } from 'react';

import { FullscreenStateContext } from '@contexts/FullscreenState.context';

import styles from './ControlButton.module.scss';
import type { ControlButtonProps } from './ControlButton.props';

/**
 * Traffic light`s button.
 *
 * @param action    "minimize" | "maximize" | "close".
 * @constructor
 */
const ControlButton: FC<ControlButtonProps> = ({ action }) => {
	const isFullscreen = useContext(FullscreenStateContext);

	/**
	 * Button`s content.
	 *
	 * @constructor
	 */
	const Content: FC<unknown> = () => {
		const sharedIconProps: LucideProps = {
			width: '100%',
			height: '100%',
		};

		switch (action) {
			case 'minimize':
				return (
					<>
						<Minus {...sharedIconProps} />
					</>
				);
			case 'maximize':
				return isFullscreen ? (
					<>
						<Minimize2 {...sharedIconProps} />
					</>
				) : (
					<>
						<Maximize2 {...sharedIconProps} />
					</>
				);
			case 'close':
				return (
					<>
						<X {...sharedIconProps} />
					</>
				);
		}
	};

	/** List of IPC actions. */
	const ipcActions: {
		[key in typeof action]: string;
	} = {
		minimize: 'minimize_app',
		maximize: isFullscreen ? 'unmaximize_app' : 'maximize_app',
		close: 'close_app',
	};

	return (
		<div
			className={cn(styles.button)}
			onClick={() => ipcRenderer.send(ipcActions[action])}
		>
			<Content />
		</div>
	);
};

export default ControlButton;
