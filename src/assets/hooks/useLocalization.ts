import { Localization } from '@localization/Localization';

import en from '@locales/en';
import ru from '@locales/ru';

import useAppSettings from '@hooks/useAppSettings';

const useLocalization = (): Localization => {
	const { language } = useAppSettings();

	switch (language.get()) {
		case 'en':
			return en;

		case 'ru':
			return ru;

		case 'system-like': {
			const preferredLanguage = navigator.language;

			if (preferredLanguage === 'ru') {
				return ru;
			}

			return en;
		}

		default: {
			return en;
		}
	}
};

export default useLocalization;
