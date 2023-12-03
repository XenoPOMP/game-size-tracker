import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { MoreHorizontal } from 'lucide-react';
import { FC } from 'react';
import TextOverflow from 'react-text-overflow';
import seedColor from 'seed-color';

import useFormattedSize from '@hooks/useFormattedSize';

import styles from './GameCard.module.scss';
import type { GameCardProps } from './GameCard.props';

const GameCard: VariableFC<'div', GameCardProps, 'children'> = ({
	className,
	game,
	...props
}) => {
	const { title, size } = game;
	const seededColor = seedColor(title ?? '');
	const formattedSize = useFormattedSize(size ?? 0, {
		roundPrecision: 2,
	});

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
				<button className={cn(styles.more)}>
					<MoreHorizontal width={'100%'} height={'100%'} />
				</button>
			</div>
		</div>
	);
};

export default GameCard;
