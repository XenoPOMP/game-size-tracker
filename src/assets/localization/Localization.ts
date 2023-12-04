import { MainPageLocales } from '@localization/types/main-page-locales';
import { MetaLocales } from '@localization/types/meta-locales';

import { AppSettings } from '@redux/reducers/appSettingsSlice';

export interface Localization extends MetaLocales {
	pages: {
		main: MainPageLocales;
	};

	measurementUnits: Record<
		'bytes' | 'kilobytes' | 'megabytes' | 'gigabytes' | 'terabytes',
		string
	>;

	languageLabels: Record<AppSettings['language'], string>;

	groupNames: Record<GameInfo['category'], string>;

	gameTooltip: Record<'goToFolder', string>;
}
