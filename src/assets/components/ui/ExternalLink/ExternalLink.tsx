import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ComponentProps, FC } from 'react';
import { Link } from 'react-router-dom';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

import styles from './ExternalLink.module.scss';
import type { ExternalLinkProps } from './ExternalLink.props';

/**
 * Opens link in external browser (sends message to ipcMain).
 *
 * @param children
 * @param onClick
 * @param className
 * @param to
 * @param props
 * @constructor
 */
const ExternalLink: VariableFC<
	'div',
	ExternalLinkProps & Pick<ComponentProps<typeof Link>, 'to'>
> = ({ children, onClick, className, to, ...props }) => {
	return (
		<div
			className={cn(className)}
			{...props}
			onClick={() => {
				let ignore = sendMessage<never>('open-in-external-browser', to);
			}}
		>
			{children}
		</div>
	);
};

export default ExternalLink;
