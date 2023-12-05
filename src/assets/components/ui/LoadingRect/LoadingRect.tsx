import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import styles from './LoadingRect.module.scss';
import type { LoadingRectProps } from './LoadingRect.props';

const LoadingRect: VariableFC<'div', LoadingRectProps, 'children'> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'min-w-[5ch] w-[5ch] h-[1.5em] bg-secondary bg-opacity-100 rounded-[.2em]',
				'animate-pulse',
				className
			)}
			style={{}}
			{...props}
		></div>
	);
};

export default LoadingRect;
