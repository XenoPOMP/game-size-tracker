import { VariableFC } from '@xenopomp/advanced-types';

import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAppDispatch } from '@redux/hooks';
import { registerNewPath } from '@redux/reducers/customPaths.slice';

import CustomDialog from '@ui/CustomDialog/CustomDialog';
import FileSelector from '@ui/FileSelector/FileSelector';
import Input from '@ui/Input/Input';

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

	const [pathToGame, setPathToGame] = useState<string | undefined>(undefined);
	const [displayingName, setDisplayingName] = useState<string>('');

	const [isBlocked, _tb, setIsBlocked] = useBoolean(true);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (pathToGame === undefined) {
			setIsBlocked(true);
			return;
		}

		setIsBlocked(false);
	}, [pathToGame]);

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
						blocked: isBlocked,
						onClick: ev => {
							if (pathToGame === undefined) {
								setIsOpen(false);
								return;
							}

							dispatch(registerNewPath({ path: pathToGame, displayingName }));
							setIsOpen(false);
						},
					},
				]}
			>
				<FileSelector
					placeholder={loc.pages.main.addNewGameDialog.selectGameFolder.label}
					onSelect={({ path }) => {
						setPathToGame(path);
					}}
					type={'directory'}
					buttons={{
						notSelectedLabel:
							loc.pages.main.addNewGameDialog.selectGameFolder
								.selectFolderLabel,
						selectedLabel:
							loc.pages.main.addNewGameDialog.selectGameFolder
								.reselectFolderLabel,
					}}
				/>

				{pathToGame && (
					<div className={cn('flex items-center gap-[.5em]')}>
						<div>
							{
								loc.pages.main.addNewGameDialog.selectGameFolder
									.tagNameInputLabel
							}
						</div>

						<Input
							className={cn('flex-grow text-[.9em]')}
							placeholder={
								loc.pages.main.addNewGameDialog.selectGameFolder
									.tagNameInputPlaceholder
							}
							value={displayingName}
							onChange={ev => {
								setDisplayingName(ev.target.value);
							}}
						/>
					</div>
				)}
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
