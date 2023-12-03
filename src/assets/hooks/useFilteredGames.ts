import { orderBy } from 'natural-orderby';
import { useMemo } from 'react';

export type FilteredGameInfo =
	| Partial<GameInfo>
	| GameInfo
	| Pick<GameInfo, 'title' | 'size'>;

export const useFilteredGames = <G extends Array<FilteredGameInfo>>(
	games: G
) => {
	const memoizedGames = useMemo(() => {
		return orderBy(games, [v => v.size], ['desc']);
	}, [games]);

	return memoizedGames;
};
