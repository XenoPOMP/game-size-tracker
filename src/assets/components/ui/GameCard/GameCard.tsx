import { VariableFC } from '@xenopomp/advanced-types';

import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { MoreHorizontal } from 'lucide-react';
import { FC } from 'react';
import TextOverflow from 'react-text-overflow';
import seedColor from 'seed-color';

import useFormattedSize from '@hooks/useFormattedSize';
import useLocalization from '@hooks/useLocalization';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

import styles from './GameCard.module.scss';
import type { GameCardProps } from './GameCard.props';

const GameCard: VariableFC<'div', GameCardProps, 'children'> = ({
	className,
	game,
	...props
}) => {
	const { title, size, pathTo } = game as GameInfo;
	const seededColor = seedColor(title ?? '');
	const formattedSize = useFormattedSize(size ?? 0, {
		roundPrecision: 2,
	});

	const loc = useLocalization();

	const revealInExplorer = () => {
		let ignore = sendMessage('reveal-in-explorer', pathTo);
	};

	return (
		<div
			className={cn(styles.gameCard, className)}
			style={{
				borderLeft: `${1 / 4}em solid ${seededColor.toHex()}`,
			}}
			{...props}
		>
			<div className={cn(styles.info)}>
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
	);
};

export default GameCard;
