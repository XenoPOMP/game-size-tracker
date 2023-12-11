import { createSlice } from '@reduxjs/toolkit';
import { Order } from 'natural-orderby';

import type { ReduxAction } from '@redux/types';

export type SortFiltersState = {
	showHidden: boolean;
	sortOrder: Exclude<Order, Function>;
	orderBy: 'size' | 'title';
};

const initialState: SortFiltersState = {
	showHidden: true,
	sortOrder: 'desc',
	orderBy: 'size',
};

const sortFiltersSlice = createSlice({
	name: 'sortFilters',
	initialState,
	reducers: {
		changeHiddenGamesVisibility(
			state,
			{ payload }: ReduxAction<SortFiltersState['showHidden']>
		) {
			state.showHidden = payload;
		},

		changeSortOrder(
			state,
			{ payload }: ReduxAction<SortFiltersState['sortOrder']>
		) {
			state.sortOrder = payload;
		},
	},
});

export default sortFiltersSlice.reducer;
export const { changeHiddenGamesVisibility, changeSortOrder } =
	sortFiltersSlice.actions;
export const initialSortFiltersState = sortFiltersSlice.getInitialState();
