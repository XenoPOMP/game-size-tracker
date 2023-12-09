import { createSlice } from '@reduxjs/toolkit';

import { ReduxAction } from '@redux/types';

export type AppSettings = {
	appVersion: string;
	appName: string;
	language: 'en' | 'ru';
	theme: 'dark' | 'light';
};

const initialState: AppSettings = {
	appVersion: '1.0.0-rc-3',
	appName: 'Game Size Tracker',
	language: 'en',
	theme: 'dark',
};

const appSettingsSlice = createSlice({
	name: 'appSettings',
	initialState,
	reducers: {
		simpleAction(state, action: ReduxAction<number>) {},

		/** Change application`s language. */
		changeLang(state, action: ReduxAction<AppSettings['language']>) {
			state.language = action.payload;
		},

		changeTheme(state, action: ReduxAction<AppSettings['theme']>) {
			state.theme = action.payload;
		},
	},
});

export default appSettingsSlice.reducer;
export const { simpleAction, changeLang, changeTheme } =
	appSettingsSlice.actions;
export const initialAppSettings = appSettingsSlice.getInitialState();
