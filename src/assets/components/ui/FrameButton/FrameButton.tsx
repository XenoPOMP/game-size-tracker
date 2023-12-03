import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import styles from './FrameButton.module.scss';
import type { FrameButtonProps } from './FrameButton.props';

const FrameButton: VariableFC<'button', FrameButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<button className={cn(styles.frame, className)} {...props}>
			{children}
		</button>
	);
};

export default FrameButton;
