import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Plus } from 'lucide-react';

import useBoolean from '@hooks/useBoolean';
import useLocalization from '@hooks/useLocalization';

import styles from './AddNewGameSection.module.scss';
import type { AddNewGameSectionProps } from './AddNewGameSection.props';

const AddNewGameSection: VariableFC<
	'section',
	AddNewGameSectionProps,
	'children'
> = ({ className, ...props }) => {
	const loc = useLocalization();

	const [isOpen, _t, setIsOpen] = useBoolean(false);

	return (
		<>
			<Dialog
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className='relative z-[6000]'
			>
				<div className='fixed inset-0 flex w-screen items-center justify-center p-[1rem] bg-primary'>
					<Dialog.Panel className='w-full max-w-sm rounded bg-white'>
						<Dialog.Title>
							{loc.pages.main.addNewGameDialog.heading}
						</Dialog.Title>

						{/* ... */}
					</Dialog.Panel>
				</div>
			</Dialog>

			<section className={cn(styles.addNew, className)} {...props}>
				<button
					className={cn(styles.newButton)}
					onClick={() => {
						setIsOpen(true);
					}}
				>
					<Plus width={'1.2em'} height={'1.2em'} />
				</button>
			</section>
		</>
	);
};

export default AddNewGameSection;
