import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { X } from 'lucide-react';
import { ComponentProps, FC } from 'react';
import TextOverflow from 'react-text-overflow';

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
> = ({
	className,
	children,
	open,
	onClose,
	title,
	maxBodyWidth,
	buttons,
	hideCloseButton,
	...props
}) => {
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
					className={cn(`w-full max-h-full rounded`, styles.body)}
					style={{
						maxWidth: maxBodyWidth,
					}}
				>
					<Dialog.Title className={cn(styles.heading)}>
						<span>
							<TextOverflow text={title ?? ''} />
						</span>

						{!hideCloseButton && (
							<X
								width={'1.25em'}
								height={'1.25em'}
								onClick={() => {
									onClose?.(false);
								}}
								className={cn('cursor-pointer')}
							/>
						)}
					</Dialog.Title>

					<section className={cn(styles.innerBody)}>
						<>{children}</>
					</section>

					<section className={cn(styles.controls)}>
						{buttons?.map(({ variant, children, onClick, ...props }, index) => {
							return (
								<>
									<CustomButton
										className={cn(styles.controlButton)}
										variant={variant}
										key={`action-${index}`}
										onClick={ev => {
											onClick?.(ev);
										}}
										{...props}
									>
										{children}
									</CustomButton>
								</>
							);
						})}
					</section>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default CustomDialog;
