import { ArrayType } from '@xenopomp/advanced-types';

import { createSlice } from '@reduxjs/toolkit';
import { randomUUID } from 'crypto';

import type { ReduxAction } from '@redux/types';

export type CustomPathsState = {
	list: Array<{
		path: string;
		uuid: string;
		displayingName?: string;
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

		registerNewPath(
			state,
			{
				payload: { path, displayingName },
			}: ReduxAction<
				Pick<ArrayType<CustomPathsState['list']>, 'path' | 'displayingName'>
			>
		) {
			state.list.push({
				path: path.replace(/\n/g, ''),
				uuid: `external-game-${randomUUID()}-${randomUUID()}`,
				displayingName,
			});
		},

		deleteRegisteredPath(state, { payload }: ReduxAction<string>) {
			const index = state.list.findIndex(item => item.uuid === payload);

			if (!(index >= -1)) {
				return;
			}

			state.list.splice(index, 1);
		},

		changeGameName(
			state,
			{
				payload: { uuid, displayingName },
			}: ReduxAction<
				Pick<ArrayType<CustomPathsState['list']>, 'uuid' | 'displayingName'>
			>
		) {
			const index = state.list.findIndex(item => item.uuid === uuid);

			state.list[index].displayingName = displayingName;
		},
	},
});

export default customPathsSlice.reducer;
export const { registerNewPath, deleteRegisteredPath, changeGameName } =
	customPathsSlice.actions;
export const initialCustomPathsState = customPathsSlice.getInitialState();
