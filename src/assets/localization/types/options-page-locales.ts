import { AppSettings } from '@redux/reducers/appSettingsSlice';

type GroupLocale<T extends object = {}> = {
	title: string;
} & T;

type SelectLocale<Options extends string> = {
	name: string;
	options: Record<Options, string>;
};

export type OptionsPageLocales = {
	goBack: string;
	groups: {
		appearance: GroupLocale<{
			options: {
				theme: SelectLocale<AppSettings['theme']>;
			};
		}>;

		language: GroupLocale;

		report: GroupLocale<{
			foundBug: string;
		}>;
	};
	version: string;
};
