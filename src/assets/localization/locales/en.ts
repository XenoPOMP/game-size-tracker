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
};

export default en;
