import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { ComponentProps, FC } from 'react';

import CustomButton from '@ui/CustomButton/CustomButton';

import styles from './CustomDialog.module.scss';
import type { CustomDialogProps } from './CustomDialog.props';

const CustomDialog: VariableFC<
	typeof Dialog,
	CustomDialogProps,
	| 'as'
	| keyof Omit<
			ComponentProps<typeof Dialog>,
			'className' | 'children' | 'open' | 'onClose'
	  >
> = ({ className, children, open, onClose, title, maxBodyWidth, ...props }) => {
	return (
		<Dialog
			ref={undefined}
			open={open}
			onClose={onClose}
			as={'div'}
			className={cn('relative z-[6000]', styles.customDialog, className)}
			{...props}
		>
			<div
				className={cn(
					'fixed inset-0 flex w-screen items-center justify-center p-[1rem] bg-primary',
					styles.bodyWrapper
				)}
			>
				<Dialog.Panel
					className={cn(
						`w-full max-w-${
							maxBodyWidth ? `[${maxBodyWidth}]` : `lg`
						} max-h-full rounded`,
						styles.body
					)}
				>
					<Dialog.Title className={cn(styles.heading)}>
						<span>{title}</span>
					</Dialog.Title>

					<section className={cn(styles.innerBody)}>
						<>{children}</>
					</section>

					<section className={cn(styles.controls)}>
						<CustomButton
							className={cn(styles.controlButton)}
							variant={'cancel'}
						>
							Cancel
						</CustomButton>

						<CustomButton className={cn(styles.controlButton)}>
							Primary
						</CustomButton>
					</section>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default CustomDialog;
