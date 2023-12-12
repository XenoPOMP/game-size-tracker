import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ExternalLinkIcon } from 'lucide-react';
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
 * @param applyStyles
 * @param props
 * @constructor
 */
const ExternalLink: VariableFC<
	'div',
	ExternalLinkProps & Pick<ComponentProps<typeof Link>, 'to'>
> = ({ children, onClick, className, to, applyStyles = false, ...props }) => {
	return (
		<div
			className={cn(styles.link, applyStyles && styles.withStyles, className)}
			{...props}
			onClick={() => {
				let ignore = sendMessage<never>('open-in-external-browser', to);
			}}
		>
			{children}

			{applyStyles && <ExternalLinkIcon height={'.9em'} />}
		</div>
	);
};

export default ExternalLink;
