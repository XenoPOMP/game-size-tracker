import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import Toggler from '@ui/Toggler/Toggler';

import styles from './DisabledToggler.module.scss';
import type { DisabledTogglerProps } from './DisabledToggler.props';

const DisabledToggler: VariableFC<typeof Toggler, DisabledTogglerProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<Toggler noToggle {...props}>
			{children}
		</Toggler>
	);
};

export default DisabledToggler;
