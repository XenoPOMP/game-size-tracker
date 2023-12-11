import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import { OptionsItemProps } from '@pages/SettingsPage/Options/Options.props';

import CustomButton from '@ui/CustomButton/CustomButton';

import styles from '../Options.module.scss';

import type { ItemProps } from './Item.props';

const Item: VariableFC<'div', ItemProps & OptionsItemProps, 'title'> = ({
	className,
	onSelect,
	title,
	children,
	...props
}) => {
	return (
		<div className={cn(styles.item, className)} {...props}>
			{title && <h4 className={cn(styles.title)}>{title}</h4>}

			{children}
		</div>
	);
};

export default Item;
