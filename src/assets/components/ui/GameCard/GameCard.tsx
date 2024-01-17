import { VariableFC } from '@xenopomp/advanced-types';

import { Menu } from '@headlessui/react';
import { GameInfo } from '@type/GameInfo';
import cn from 'classnames';
import { MoreHorizontal } from 'lucide-react';
import { FC } from 'react';
import TextOverflow from 'react-text-overflow';
import seedColor from 'seed-color';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { deleteRegisteredPath } from '@redux/reducers/customPaths.slice';
import { hideGame, showGame } from '@redux/reducers/gameFilters.slice';

import CustomDialog from '@ui/CustomDialog/CustomDialog';

import useBoolean from '@hooks/useBoolean';
import useFormattedSize from '@hooks/useFormattedSize';
import useLocalization from '@hooks/useLocalization';

import { inlineLocalizationVar } from '@utils/inlineLocalizationVar';
import { sendMessage } from '@utils/ipc-tools/sendMessage';

import styles from './GameCard.module.scss';
import type { GameCardProps } from './GameCard.props';

const GameCard: VariableFC<'div', GameCardProps, 'children'> = ({
	className,
	game,
	onMouseEnter,
	onMouseLeave,
	...props
}) => {
	const { title, size, pathTo, category, uuid } = game as GameInfo;
	const seededColor = seedColor(title ?? '');
	const formattedSize = useFormattedSize(size ?? 0, {
		roundPrecision: 2,
	});

	const filters = useAppSelector(state => state.gameFilters[title]);
	const { showHidden } = useAppSelector(state => state.sortFilters);

	const [isRemoveDialogOpen, toggleRemoveDialog, setRemoveDialogToggled] =
		useBoolean(false);

	const loc = useLocalization();

	const dispatch = useAppDispatch();

	const revealInExplorer = () => {
		let ignore = sendMessage('reveal-in-explorer', pathTo);
	};

	const notDisplaying = filters?.hidden && !showHidden;

	const officialStores: GameInfo['category'][] = ['steam', 'egs'];

	const CustomMenuButton: VariableFC<typeof Menu.Item, {}> = ({
		as = 'div',
		className,
		children,
		onClick,
		...props
	}) => {
		return (
			<Menu.Item
				as={as}
				className={cn(styles.item, className)}
				onClick={() => {
					onClick?.();
				}}
				{...props}
			>
				{children}
			</Menu.Item>
		);
	};

	const SteamButtons: FC = () => {
		return (
			<>
				{filters?.hidden ? (
					<>
						<CustomMenuButton
							onClick={() => {
								dispatch(showGame(title));
							}}
						>
							{loc.gameTooltip.show}
						</CustomMenuButton>
					</>
				) : (
					<>
						<CustomMenuButton
							onClick={() => {
								dispatch(hideGame(title));
							}}
						>
							{loc.gameTooltip.hide}
						</CustomMenuButton>
					</>
				)}
			</>
		);
	};

	const OtherGamesButtons: FC = () => {
		return (
			<>
				<CustomMenuButton
					onClick={() => {
						setRemoveDialogToggled(true);
					}}
				>
					{loc.gameTooltip.remove}
				</CustomMenuButton>
			</>
		);
	};

	return (
		<>
			<CustomDialog
				open={isRemoveDialogOpen}
				onClose={() => {
					setRemoveDialogToggled(false);
				}}
				title={loc.gameTooltip.dialogs.removeOtherGame.label}
				hideCloseButton
				buttons={[
					{
						variant: 'cancel',
						children: loc.gameTooltip.dialogs.removeOtherGame.cancelButton,
						blocked: false,
						onClick: ev => {
							setRemoveDialogToggled(false);
						},
					},
					{
						variant: 'danger',
						children: loc.gameTooltip.dialogs.removeOtherGame.removeButton,
						blocked: false,
						onClick: ev => {
							if (uuid !== undefined) {
								dispatch(deleteRegisteredPath(uuid));
							}

							setRemoveDialogToggled(false);
						},
					},
				]}
			>
				{inlineLocalizationVar(
					loc.gameTooltip.dialogs.removeOtherGame.areYouSureLabel,
					{
						GAME: title,
					}
				)}
			</CustomDialog>

			{!notDisplaying && (
				<div
					className={cn(
						styles.gameCard,
						filters?.hidden ? 'bg-opacity-25' : '',
						className
					)}
					style={{
						borderLeft: `${1 / 4}em solid ${seededColor.toHex()}`,
					}}
					onMouseEnter={ev => {
						onMouseEnter?.(ev);
					}}
					onMouseLeave={ev => {
						onMouseLeave?.(ev);
					}}
					{...props}
				>
					<div className={cn(styles.info, filters?.hidden ? 'opacity-25' : '')}>
						<div>
							<h4>
								<TextOverflow text={title ?? ''} />
							</h4>
						</div>

						<div className={cn(styles.size)}>{formattedSize}</div>
					</div>

					<div className={cn(styles.controls)}>
						<Menu>
							<Menu.Button as={'button'} className={cn(styles.more)}>
								<MoreHorizontal width={'100%'} height={'100%'} />
							</Menu.Button>

							<Menu.Items as={'div'} className={cn(styles.menu)}>
								{officialStores.includes(category) && <SteamButtons />}
								{category === 'other' && <OtherGamesButtons />}

								<Menu.Item
									as={'div'}
									className={cn(styles.item)}
									onClick={() => {
										revealInExplorer();
									}}
								>
									{loc.gameTooltip.goToFolder}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</div>
				</div>
			)}
		</>
	);
};

export default GameCard;
