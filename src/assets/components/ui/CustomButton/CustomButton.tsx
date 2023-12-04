import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { CSSProperties, ComponentProps } from 'react';

import styles from './CustomButton.module.scss';
import type { CustomButtonProps } from './CustomButton.props';

const CustomButton: VariableFC<'button', CustomButtonProps> = ({
	className,
	children,
	variant = 'primary',
	...props
}) => {
	const inlineStyles: Record<
		typeof variant,
		Pick<ComponentProps<'button'>, 'className'>
	> = {
		primary: {
			className: cn('bg-confirm text-confirm-color hover:bg-confirm-brutal'),
		},
		cancel: {
			className: cn(
				'bg-button-cancel-bg',
				'text-button-cancel-color',
				'hover:bg-button-cancel-bg-brutal'
			),
		},
	};

	return (
		<button
			className={cn(
				styles.customButton,
				inlineStyles[variant].className,
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default CustomButton;
