import { Nullable } from '@xenopomp/advanced-types';

import { createSlice } from '@reduxjs/toolkit';

import type { ReduxAction } from '@redux/types';

type Cache = Nullable<GameInfo[]>;

export type CacheState = {
	officialGames: Record<Exclude<GameInfo['category'], 'other'>, Cache>;

	otherGames: Cache;
};

const initialState: CacheState = {
	officialGames: {
		steam: null,
		egs: null,
	},

	otherGames: null,
};

const cacheSlice = createSlice({
	name: 'cache',
	initialState,
	reducers: {
		cacheSteamGames(state, { payload }: ReduxAction<GameInfo[]>) {
			state.officialGames.steam = payload;
		},

		cacheEgsGames(state, { payload }: ReduxAction<GameInfo[]>) {
			state.officialGames.egs = payload;
		},

		cacheCustomGames(state, { payload }: ReduxAction<GameInfo[]>) {
			state.otherGames = payload;
		},
	},
});

export default cacheSlice.reducer;
export const { cacheSteamGames, cacheEgsGames, cacheCustomGames } =
	cacheSlice.actions;
export const initialCacheState = cacheSlice.getInitialState();
