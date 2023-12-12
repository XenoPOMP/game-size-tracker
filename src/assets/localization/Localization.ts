import { GameInfo } from '@type/GameInfo';
import { SystemLikeOption } from '@type/SystemLikeOption';

import { LibsPageLocales } from '@localization/types/libsPage-locales';
import { MainPageLocales } from '@localization/types/main-page-locales';
import { MetaLocales } from '@localization/types/meta-locales';
import { OptionsPageLocales } from '@localization/types/options-page-locales';

import { AppSettings } from '@redux/reducers/appSettingsSlice';
import { SortFiltersState } from '@redux/reducers/sortFilters.slice';

export interface Localization extends MetaLocales {
	pages: {
		main: MainPageLocales;
		options: OptionsPageLocales;
		libs: LibsPageLocales;
	};

	groupHiddenLabel: string;

	measurementUnits: Record<
		'bytes' | 'kilobytes' | 'megabytes' | 'gigabytes' | 'terabytes',
		string
	>;

	languageLabels: Record<
		Exclude<AppSettings['language'], SystemLikeOption>,
		string
	>;

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

	systemLikeOption: string;
}
