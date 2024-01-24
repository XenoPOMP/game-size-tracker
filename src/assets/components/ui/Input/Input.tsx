import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import styles from './Input.module.scss';
import type { InputProps } from './Input.props';

const Input: VariableFC<'input', InputProps> = ({ className, ...props }) => {
	return <input className={cn(styles.appInput, className)} {...props} />;
};

export default Input;
