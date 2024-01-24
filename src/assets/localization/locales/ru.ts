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
		libsPage: {
			title: 'Библиотеки',
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
					tagNameInputLabel: 'Название',
					tagNameInputPlaceholder: 'Это поле может быть пустым',
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
								emerald: 'Изумрудная',
								retrowave: 'Ретро-вейв',
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
					sourceCode: 'Исходный код',
					libs: 'Используемые библиотеки',
				},
			},
			version: `вер. {{VERSION}}`,
		},

		libs: {
			deps: 'Зависимости',
			devDeps: 'Зависимости для разработчика',
		},
	},

	groupHiddenLabel: 'Показано {{showing}} игр из {{total}}',

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
		tag: 'Переименовать игру',

		dialogs: {
			renameGame: {
				label: 'Переименовать {{GAME}}',
				rename: 'Переименовать',
			},

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
