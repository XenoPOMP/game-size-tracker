import { PropsWith, VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import Frame from '@ui/Frame/Frame';

import styles from './Layout.module.scss';
import type { LayoutProps } from './Layout.props';

/**
 * Layout component. Contains base structure of application.
 *
 * @param children
 * @constructor
 */
const Layout: VariableFC<'div', LayoutProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={cn(styles.layout, className)} {...props}>
			<Frame />
			{children}
		</div>
	);
};

export default Layout;
