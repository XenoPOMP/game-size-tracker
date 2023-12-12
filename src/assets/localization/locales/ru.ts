import { Localization } from '@localization/Localization';

import { initialAppSettings } from '@redux/reducers/appSettingsSlice';

const ru: Localization = {
	meta: {
		mainPage: {
			title: initialAppSettings.appName,
			description: '',
		},
		optionsPage: {
			title: 'Настройки',
			description: '',
		},
	},

	pages: {
		main: {
			addNewGameDialog: {
				heading: 'Добавить стороннюю игру',

				selectGameFolder: {
					label: 'Выберете папку игры',
					selectFolderLabel: 'Выбрать папку',
					reselectFolderLabel: 'Выбрать заново',
				},

				buttons: {
					cancel: 'Отменить',
					add: 'Добавить',
				},
			},
		},
		options: {
			goBack: 'Назад',
			groups: {
				appearance: {
					title: 'Внешний вид',
					options: {
						theme: {
							name: 'Тема',
							options: {
								dark: 'Темная',
								light: 'Светлая',
							},
						},
					},
				},

				language: {
					title: 'Язык',
				},

				report: {
					title: 'Обратная связь',

					foundBug: 'Нашли баг?',
				},
			},
			version: `вер. {{VERSION}}`,
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
		egs: 'Epic Games Store',
		other: 'Другие',
	},

	filters: {
		orderBy: 'Сортировать по:',
		size: 'Размеру',
		title: 'Названию',
	},

	gameTooltip: {
		goToFolder: 'Показать в Проводнике',
		hide: 'Скрыть',
		show: 'Показать',
		remove: 'Убрать',

		dialogs: {
			removeOtherGame: {
				label: 'Вы уверены?',
				areYouSureLabel:
					'Вы собираетесь убрать из списка {{GAME}}.\nЭто действие нельзя отменить!',
				cancelButton: 'Отменить',
				removeButton: 'Я уверен',
			},
		},
	},

	systemLikeOption: 'Как в системе',
};

export default ru;
