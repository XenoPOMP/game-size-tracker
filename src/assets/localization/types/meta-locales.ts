import type { MetaInfo } from '@type/MetaInfo';

export type MetaLocales = {
	meta: Record<'mainPage' | 'optionsPage' | 'libsPage', MetaInfo>;
};
