import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ExternalLinkIcon } from 'lucide-react';
import { icons } from 'lucide-react';
import { ComponentProps, ElementType, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
 * @param icon
 * @param props
 * @constructor
 */
const ExternalLink: VariableFC<
	'div',
	ExternalLinkProps & Pick<ComponentProps<typeof Link>, 'to'>
> = ({
	children,
	onClick,
	className,
	to,
	applyStyles = false,
	useRouter = false,
	icon: Icon = ExternalLinkIcon,
	...props
}) => {
	const navigate = useNavigate();

	return (
		<div
			className={cn(styles.link, applyStyles && styles.withStyles, className)}
			{...props}
			onClick={ev => {
				onClick?.(ev);

				if (useRouter) {
					navigate(to);
					return;
				}

				let ignore = sendMessage<never>('open-in-external-browser', to);
			}}
		>
			{children}

			{applyStyles && <Icon height={'.9em'} />}
		</div>
	);
};

export default ExternalLink;
