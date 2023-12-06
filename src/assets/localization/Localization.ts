import { MainPageLocales } from '@localization/types/main-page-locales';
import { MetaLocales } from '@localization/types/meta-locales';

import { AppSettings } from '@redux/reducers/appSettingsSlice';
import { SortFiltersState } from '@redux/reducers/sortFilters.slice';

export interface Localization extends MetaLocales {
	pages: {
		main: MainPageLocales;
	};

	groupHiddenLabel: string;

	measurementUnits: Record<
		'bytes' | 'kilobytes' | 'megabytes' | 'gigabytes' | 'terabytes',
		string
	>;

	languageLabels: Record<AppSettings['language'], string>;

	groupNames: Record<GameInfo['category'], string>;

	filters: {
		orderBy: string;
	} & Record<SortFiltersState['orderBy'], string>;

	gameTooltip: Record<'goToFolder' | 'hide' | 'show' | 'remove', string> & {
		dialogs: {
			removeOtherGame: {
				label: string;
				areYouSureLabel: string;
				cancelButton: string;
				removeButton: string;
			};
		};
	};
}
