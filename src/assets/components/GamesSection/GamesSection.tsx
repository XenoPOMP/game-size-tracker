import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ReactNode, useMemo } from 'react';

import { useAppSelector } from '@redux/hooks';

import GameCard from '@ui/GameCard/GameCard';

import { useFilteredGames } from '@hooks/useFilteredGames';
import useLocalization from '@hooks/useLocalization';

import { inlineLocalizationVar } from '@utils/inlineLocalizationVar';

import styles from './GamesSection.module.scss';
import type { GamesSectionProps } from './GamesSection.props';

const GamesSection: VariableFC<'article', GamesSectionProps, 'children'> = ({
	className,
	games,
	label,
	...props
}) => {
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

export default GamesSection;
