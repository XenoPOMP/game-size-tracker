import { createSlice } from '@reduxjs/toolkit';

import type { ReduxAction } from '@redux/types';

export type GameFiltersState = Record<
	string,
	{
		hidden?: boolean;
	}
>;

const initialState: GameFiltersState = {};

const gameFiltersSlice = createSlice({
	name: 'gameFilters',
	initialState,
	reducers: {
		hideGame(state, { payload }: ReduxAction<string>) {
			if (state[payload] === undefined) {
				state[payload] = {
					hidden: true,
				};
			}

			state[payload].hidden = true;
		},

		showGame(state, { payload }: ReduxAction<string>) {
			if (state[payload] === undefined) {
				state[payload] = {
					hidden: false,
				};
			}

			state[payload].hidden = false;
		},
	},
});

export default gameFiltersSlice.reducer;
export const { hideGame, showGame } = gameFiltersSlice.actions;
export const initialGameFiltersState = gameFiltersSlice.getInitialState();
