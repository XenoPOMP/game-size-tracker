import { Localization } from '@localization/Localization';

const ru: Localization = {
	meta: {
		mainPage: {
			title: 'Главная',
			description: '',
		},
	},

	pages: {
		main: {
			addNewGameDialog: {
				heading: 'Добавить стороннюю игру',
				buttons: {
					cancel: 'Отменить',
					add: 'Добавить',
				},
			},
		},
	},

	groupHiddenLabel: 'Всего {{totalGames}}, {{hiddenGames}} скрыто',

	measurementUnits: {
		bytes: 'Б',
		kilobytes: 'КБ',
		megabytes: 'МБ',
		gigabytes: 'ГБ',
		terabytes: 'ТБ',
	},

	languageLabels: {
		en: 'English',
		ru: 'Русский',
	},

	groupNames: {
		steam: 'Steam',
		other: 'Другие',
	},

	gameTooltip: {
		goToFolder: 'Показать в Проводнике',
		hide: 'Скрыть',
		show: 'Показать',
	},
};

export default ru;
