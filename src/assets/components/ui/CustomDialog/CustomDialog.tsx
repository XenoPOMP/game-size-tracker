import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { FC } from 'react';

import styles from './CustomDialog.module.scss';
import type { CustomDialogProps } from './CustomDialog.props';

const CustomDialog: VariableFC<typeof Dialog, CustomDialogProps, 'as'> = ({
	className,
	children,
	open,
	onClose,
	title,
	...props
}) => {
	return (
		<Dialog
			ref={undefined}
			open={open}
			onClose={onClose}
			as={'div'}
			className={cn('relative z-[6000]')}
		>
			<div className='fixed inset-0 flex w-screen items-center justify-center p-[1rem] bg-primary'>
				<Dialog.Panel className='w-full max-w-sm rounded bg-white'>
					<Dialog.Title>{title}</Dialog.Title>

					<>{children}</>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default CustomDialog;
