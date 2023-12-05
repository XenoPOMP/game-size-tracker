import { Localization } from '@localization/Localization';

const en: Localization = {
	meta: {
		mainPage: {
			title: 'Main page',
			description: '',
		},
	},

	pages: {
		main: {
			addNewGameDialog: {
				heading: 'Add external game',
				buttons: {
					cancel: 'Cancel',
					add: 'Add',
				},
			},
		},
	},

	groupHiddenLabel: 'Total {{totalGames}}, {{hiddenGames}} hidden',

	measurementUnits: {
		bytes: 'B',
		kilobytes: 'KB',
		megabytes: 'MB',
		gigabytes: 'GB',
		terabytes: 'TB',
	},

	languageLabels: {
		en: 'English',
		ru: 'Русский',
	},

	groupNames: {
		steam: 'Steam',
		other: 'Other',
	},

	gameTooltip: {
		goToFolder: 'Reveal in Explorer',
		hide: 'Hide',
		show: 'Show',
	},
};

export default en;
