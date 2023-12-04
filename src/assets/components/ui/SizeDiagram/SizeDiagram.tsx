import { VariableFC } from '@xenopomp/advanced-types';
import { roundNumber } from '@xenopomp/advanced-utils';

import cn from 'classnames';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import seedColor from 'seed-color';

import LoadingRect from '@ui/LoadingRect/LoadingRect';

import { useFilteredGames } from '@hooks/useFilteredGames';
import useFormattedSize from '@hooks/useFormattedSize';

import { formatDecimal } from '@utils/formatDecimal';
import { summary } from '@utils/math-utils';

import styles from './SizeDiagram.module.scss';
import type { SizeDiagramProps } from './SizeDiagram.props';

const SizeDiagram: VariableFC<'section', SizeDiagramProps, 'children'> = ({
	className,
	games,
	isLoading,
	...props
}) => {
	const getRowBytesCount = useCallback(() => {
		return summary(...(games ?? []).map(game => game.size));
	}, [games]);

	const getPercentage = (target: number) => {
		return (target / getRowBytesCount()) * 100;
	};

	const formattedTotalSize = useFormattedSize(getRowBytesCount(), {
		roundPrecision: 2,
	});

	const memoizedGames = useFilteredGames(games ?? []);

	return (
		<>
			<section className={cn(styles.diagram, className)} {...props}>
				{isLoading ? (
					<LoadingRect className={cn('!h-[1.5em]')} />
				) : (
					<h2>{formattedTotalSize}</h2>
				)}

				<article
					className={
						'w-full h-[8px] bg-secondary rounded-[40px] flex overflow-hidden'
					}
				>
					{!isLoading &&
						memoizedGames?.map(({ title, size }, index) => {
							const seededColor = seedColor(title ?? '');
							const percent = getPercentage(size ?? 0);

							return (
								<div
									key={`${title}-game-percentage-[${index}]`}
									className={`h-full`}
									style={{
										background: seededColor.toHex(),
										width: `${percent}%`,
									}}
								></div>
							);
						})}
				</article>
			</section>
		</>
	);
};

export default SizeDiagram;
