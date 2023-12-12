import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ExternalLinkIcon, LucideIcon } from 'lucide-react';
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
	leftIcon: LeftIcon,
	...props
}) => {
	const navigate = useNavigate();

	const sharedIconProps: ComponentProps<LucideIcon> = {
		height: '.9em',
	};

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
			{LeftIcon && <LeftIcon {...sharedIconProps} />}

			{children}

			{applyStyles && <Icon {...sharedIconProps} />}
		</div>
	);
};

export default ExternalLink;
