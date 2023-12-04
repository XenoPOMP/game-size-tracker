import { createSlice } from '@reduxjs/toolkit';

import type { ReduxAction } from '@redux/types';

export type SortFiltersState = {
	showHidden: boolean;
};

const initialState: SortFiltersState = {
	showHidden: true,
};

const sortFiltersSlice = createSlice({
	name: 'sortFilters',
	initialState,
	reducers: {
		simpleAction(state, action: ReduxAction<any>) {},

		changeHiddenGamesVisibility(
			state,
			{ payload }: ReduxAction<SortFiltersState['showHidden']>
		) {
			state.showHidden = payload;
		},
	},
});

export default sortFiltersSlice.reducer;
export const { simpleAction, changeHiddenGamesVisibility } =
	sortFiltersSlice.actions;
export const initialSortFiltersState = sortFiltersSlice.getInitialState();
