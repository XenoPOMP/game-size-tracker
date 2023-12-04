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
				'min-w-[5ch] w-fit h-[100%] bg-secondary bg-opacity-100 rounded-[.2em]',
				'animate-pulse',
				className
			)}
			style={{}}
			{...props}
		></div>
	);
};

export default LoadingRect;
