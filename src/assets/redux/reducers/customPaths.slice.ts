import { createSlice } from '@reduxjs/toolkit';
import { randomUUID } from 'crypto';

import type { ReduxAction } from '@redux/types';

export type CustomPathsState = {
	list: Array<{
		path: string;
		uuid: string;
	}>;
};

const initialState: CustomPathsState = {
	list: [],
};

const customPathsSlice = createSlice({
	name: 'customPaths',
	initialState,
	reducers: {
		simpleAction(state, action: ReduxAction<any>) {},

		registerNewPath(state, { payload }: ReduxAction<string>) {
			state.list.push({
				path: payload.replace(/\n/g, ''),
				uuid: `external-game-${randomUUID()}-${randomUUID()}`,
			});
		},

		deleteRegisteredPath(state, { payload }: ReduxAction<string>) {
			const index = state.list.findIndex(item => item.uuid === payload);

			if (!(index >= -1)) {
				return;
			}

			state.list.splice(index, 1);
		},
	},
});

export default customPathsSlice.reducer;
export const { registerNewPath, deleteRegisteredPath } =
	customPathsSlice.actions;
export const initialCustomPathsState = customPathsSlice.getInitialState();
