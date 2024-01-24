import { createSlice } from '@reduxjs/toolkit';
import { SystemLikeOption } from '@type/SystemLikeOption';

import { ReduxAction } from '@redux/types';

export type AppSettings = {
	appVersion: string;
	appName: string;
	language: 'en' | 'ru' | SystemLikeOption;
	theme: 'dark' | 'light';
};

const initialState: AppSettings = {
	appVersion: '1.1.0',
	appName: 'Game Size Tracker',
	language: 'system-like',
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
