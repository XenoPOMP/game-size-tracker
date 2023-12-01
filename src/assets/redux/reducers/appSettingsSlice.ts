import { createSlice } from '@reduxjs/toolkit';

import { ReduxAction } from '@redux/types';

export type AppSettings = {
	appVersion: string;
	appName: string;
	language: 'en';
};

const initialState: AppSettings = {
	appVersion: '1.3.1',
	appName: 'React Vite Application',
	language: 'en',
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
	},
});

export default appSettingsSlice.reducer;
export const { simpleAction, changeLang } = appSettingsSlice.actions;
export const initialAppSettings = appSettingsSlice.getInitialState();
