import { VariableFC } from '@xenopomp/advanced-types';
import { roundNumber } from '@xenopomp/advanced-utils';

import cn from 'classnames';
import { FC, ReactNode, useCallback } from 'react';
import seedColor from 'seed-color';

import { formatDecimal } from '@utils/formatDecimal';
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
		return (
			<>
				{formatDecimal(getRowBytesCount(), {
					roundPrecision: 2,
				})}{' '}
				bytes
			</>
		);
	};

	return (
		<section className={cn(styles.diagram, className)} {...props}>
			<h2>{getTotalSize()}</h2>

			<article
				className={
					'w-full h-[8px] bg-secondary rounded-[40px] flex overflow-hidden'
				}
			>
				{games.map(({ title, size }, index) => {
					const seededColor = seedColor(title);
					const percent = getPercentage(size);

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
	);
};

export default SizeDiagram;
