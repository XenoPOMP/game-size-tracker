import { Localization } from '@localization/Localization';

import { initialAppSettings } from '@redux/reducers/appSettingsSlice';

const en: Localization = {
	meta: {
		mainPage: {
			title: initialAppSettings.appName,
			description: '',
		},
		optionsPage: {
			title: 'Settings',
			description: '',
		},
	},

	pages: {
		main: {
			addNewGameDialog: {
				heading: 'Add external game',

				selectGameFolder: {
					label: 'Select game folder',
					selectFolderLabel: 'Select folder',
					reselectFolderLabel: 'Reselect',
				},

				buttons: {
					cancel: 'Cancel',
					add: 'Add',
				},
			},
		},
		options: {
			goBack: 'Back',
			groups: {
				appearance: {
					title: 'Appearance',
					options: {
						theme: {
							name: 'Theme',
							options: {
								dark: 'Dark',
								light: 'Light',
							},
						},
					},
				},

				language: {
					title: 'Language',
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
		egs: 'Epic Games Store',
		other: 'Other',
	},

	filters: {
		orderBy: 'Order by:',
		size: 'Size',
		title: 'Title',
	},

	gameTooltip: {
		goToFolder: 'Reveal in Explorer',
		hide: 'Hide',
		show: 'Show',
		remove: 'Remove',

		dialogs: {
			removeOtherGame: {
				label: 'Are you sure?',
				areYouSureLabel:
					'You`re going to remove {{GAME}} from the list.\nThis action can not be undone!',
				cancelButton: 'Cancel',
				removeButton: 'I`m sure',
			},
		},
	},

	systemLikeOption: 'System like',
};

export default en;
