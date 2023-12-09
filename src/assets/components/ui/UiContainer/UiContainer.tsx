import { PropsWith } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import styles from './UiContainer.module.scss';
import type { UiContainerProps } from './UiContainer.props';

interface UiContainerNestedProps
	extends PropsWith<
		'children' | 'className' | 'id' | 'style',
		UiContainerProps
	> {}

const UiContainer: FC<UiContainerNestedProps> = ({
	children,
	className,
	id,
	style,
	margin,
	maxWidth,
	as = 'section',
}) => {
	const Component = as;

	return (
		<Component
			style={
				{
					'--max-container-width': maxWidth ?? '1920px',
					'--margin': margin,
					...style,
				} as CSSProperties
			}
			className={cn(styles.uiContainer, className)}
			id={id}
		>
			{children}
		</Component>
	);
};

export default UiContainer;
