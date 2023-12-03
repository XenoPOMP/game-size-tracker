import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { useMemo } from 'react';

import GameCard from '@ui/GameCard/GameCard';

import { useFilteredGames } from '@hooks/useFilteredGames';

import styles from './GamesSection.module.scss';
import type { GamesSectionProps } from './GamesSection.props';

const GamesSection: VariableFC<'article', GamesSectionProps, 'children'> = ({
	className,
	games,
	label,
	...props
}) => {
	const memoizedGames = useFilteredGames(games ?? []);

	return (
		<article className={cn(styles.gameSection, className)} {...props}>
			<h3>
				{label} ({memoizedGames.length})
			</h3>

			{memoizedGames?.map(game => {
				return <GameCard game={game} />;
			})}
		</article>
	);
};

export default GamesSection;
