import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';
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
	const seededColor = seedColor(title);
	const formattedSize = useFormattedSize(size, {
		roundPrecision: 2,
	});

	return (
		<div className={cn(styles.gameCard, className)}>
			<div
				className={'h-[10px] aspect-square'}
				style={{
					background: seededColor.toHex(),
				}}
			></div>{' '}
			<div>
				{title} | {formattedSize}
			</div>
		</div>
	);
};

export default GameCard;
