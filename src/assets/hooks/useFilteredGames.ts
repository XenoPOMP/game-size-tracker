import { Identifier, orderBy } from 'natural-orderby';
import { useMemo } from 'react';

export type FilteredGameInfo =
	| Partial<GameInfo>
	| GameInfo
	| Pick<GameInfo, 'title' | 'size'>;

interface UseFilteredGamesOptions {
	/** If **true**, sorts games by size anyway. */
	ignoreGlobalSort?: boolean;
}

/** Infer orderBy function order array. */
type InferOrderArray<G extends Array<any>> = G extends Array<infer T>
	? Identifier<T> | readonly Identifier<T>[] | null | undefined
	: never;

export const useFilteredGames = (
	games: Array<FilteredGameInfo>,
	options?: UseFilteredGamesOptions
) => {
	const memoizedGames = useMemo(() => {
		const getOrderArray = (): InferOrderArray<Array<FilteredGameInfo>> => {
			/** Order by size if ignoreGlobalSort option provided. */
			if (options?.ignoreGlobalSort) {
				return [v => v.size];
			}

			/** Order by size by default. */
			return [v => v.size];
		};

		return orderBy(games, getOrderArray(), ['desc']);
	}, [games]);

	return memoizedGames;
};
