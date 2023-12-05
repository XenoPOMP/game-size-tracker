import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC, ReactNode, useMemo } from 'react';

import { useAppSelector } from '@redux/hooks';

import GameCard from '@ui/GameCard/GameCard';
import LoadingRect from '@ui/LoadingRect/LoadingRect';

import { useFilteredGames } from '@hooks/useFilteredGames';
import useLocalization from '@hooks/useLocalization';

import { inlineLocalizationVar } from '@utils/inlineLocalizationVar';

import styles from './GamesSection.module.scss';
import type { GamesSectionProps } from './GamesSection.props';

const GamesSection: VariableFC<'article', GamesSectionProps, 'children'> & {
	Loader: VariableFC<'article', Omit<GamesSectionProps, 'games'>, 'children'>;
} = ({ className, games, label, ...props }) => {
	const loc = useLocalization();

	const memoizedGames = useFilteredGames(games ?? []);
	const gameFilters = useAppSelector(state => state.gameFilters);
	const { showHidden } = useAppSelector(state => state.sortFilters);

	const generateCountLabel = (): ReactNode => {
		const totalGameCount = memoizedGames.length;
		const hiddenGamesCount = memoizedGames.filter(({ title }) => {
			if (title === undefined) {
				return false;
			}

			return gameFilters[title]?.hidden;
		}).length;

		if (hiddenGamesCount > 0 && !showHidden) {
			return (
				<>
					(
					{inlineLocalizationVar(loc.groupHiddenLabel, {
						totalGames: `${totalGameCount}`,
						hiddenGames: `${hiddenGamesCount}`,
					})}
					)
				</>
			);
		}

		return <>({totalGameCount})</>;
	};

	return (
		<>
			{memoizedGames.length > 0 && (
				<article className={cn(styles.gameSection, className)} {...props}>
					<h3>
						{label} {generateCountLabel()}
					</h3>

					{memoizedGames?.map(game => {
						return <GameCard game={game} />;
					})}
				</article>
			)}
		</>
	);
};

GamesSection.Loader = ({ className, label, ...props }) => {
	return (
		<article className={cn(styles.gameSection, className)} {...props}>
			<LoadingRect className={cn('!h-[1.35em]')} style={{}} />

			<LoadingRect className={cn('!h-[3.6em] !w-full')} style={{}} />
			<LoadingRect className={cn('!h-[3.6em] !w-full')} style={{}} />
		</article>
	);
};

export default GamesSection;
