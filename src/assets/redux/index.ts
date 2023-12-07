import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appSettingsSlice, {
	initialAppSettings,
} from '@redux/reducers/appSettingsSlice';
import customPathsSlice from '@redux/reducers/customPaths.slice';
import gameFiltersSlice from '@redux/reducers/gameFilters.slice';
import sortFiltersSlice from '@redux/reducers/sortFilters.slice';
import steamGamesSlice from '@redux/reducers/steamGames.slice';

/** App`s root reducer. */
const rootReducer = combineReducers({
	appSettings: appSettingsSlice,
	// steamGames: steamGamesSlice,
	gameFilters: gameFiltersSlice,
	sortFilters: sortFiltersSlice,
	customPaths: customPathsSlice,
});

/** Redux-persist config. */
const persistConfig = getPersistConfig({
	key: `[${initialAppSettings.appName}] root`,
	storage,
	blacklist: ['appSettings.appVersion', 'appSettings.appName', 'steamGames'],
	rootReducer,
});

/** Persisted reducer. All data changes will be saved in local storage. */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Redux store. */
const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
