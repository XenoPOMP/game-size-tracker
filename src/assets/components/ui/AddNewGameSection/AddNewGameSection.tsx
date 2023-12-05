import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Plus } from 'lucide-react';

import CustomDialog from '@ui/CustomDialog/CustomDialog';

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
			<CustomDialog
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
				hideCloseButton
				maxBodyWidth={`900px`}
				title={loc.pages.main.addNewGameDialog.heading}
				buttons={[
					{
						variant: 'cancel',
						children: loc.pages.main.addNewGameDialog.buttons.cancel,
						blocked: false,
						onClick: ev => {
							setIsOpen(false);
						},
					},
					{
						children: loc.pages.main.addNewGameDialog.buttons.add,
						blocked: true,
					},
				]}
			>
				Here
			</CustomDialog>

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
