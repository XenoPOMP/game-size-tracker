import { VariableFC } from '@xenopomp/advanced-types';
import { roundNumber } from '@xenopomp/advanced-utils';

import cn from 'classnames';
import { FC, ReactNode, useCallback } from 'react';
import seedColor from 'seed-color';

import { summary } from '@utils/math-utils';

import styles from './SizeDiagram.module.scss';
import type { SizeDiagramProps } from './SizeDiagram.props';

const SizeDiagram: VariableFC<'section', SizeDiagramProps, 'children'> = ({
	className,
	games,
	...props
}) => {
	const getRowBytesCount = useCallback(() => {
		return summary(...games.map(game => game.size));
	}, [games]);

	const getPercentage = (target: number) => {
		return (target / getRowBytesCount()) * 100;
	};

	const getTotalSize = (): ReactNode => {
		return <>{roundNumber(getRowBytesCount(), 2)} bytes</>;
	};

	return (
		<section className={cn(className)} {...props}>
			{getTotalSize()}

			<article
				className={
					'w-full h-[8px] bg-secondary rounded-[40px] flex overflow-hidden'
				}
			>
				{games.map(({ title, size }) => {
					const seededColor = seedColor(title);
					const percent = getPercentage(size);

					return (
						<div
							className={`h-full`}
							style={{
								background: seededColor.toHex(),
								width: `${percent}%`,
							}}
						></div>
					);
				})}
			</article>

			{games.map(({ title, size }) => {
				const colorSeed = seedColor(title);

				return (
					<div className={cn('flex gap-[.5em] flex-wrap items-center')}>
						<div
							className={`h-[10px] aspect-square`}
							style={{
								background: colorSeed.toHex(),
							}}
						></div>

						{title}

						<div>| {roundNumber(getPercentage(size), 2)}%</div>
					</div>
				);
			})}
		</section>
	);
};

export default SizeDiagram;
