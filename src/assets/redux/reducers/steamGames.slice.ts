import { createSlice } from '@reduxjs/toolkit';

import type { ReduxAction } from '@redux/types';

export type SteamGamesState = {};

const initialState: SteamGamesState = {};

const steamGamesSlice = createSlice({
	name: 'steamGames',
	initialState,
	reducers: {
		simpleAction(state, action: ReduxAction<any>) {},

		loadSteamGames(state) {},
	},
});

export default steamGamesSlice.reducer;
export const { simpleAction, loadSteamGames } = steamGamesSlice.actions;
export const initialSteamGamesState = steamGamesSlice.getInitialState();
