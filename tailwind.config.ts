import { type Config } from 'tailwindcss';
import tailwindThemer from 'tailwindcss-themer';

import darkTheme from './themes/dark.theme';
import lightTheme from './themes/light.theme';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],

	theme: {},

	plugins: [
		tailwindThemer({
			themes: [
				{
					name: 'default-theme',
					extend: darkTheme,
				},
				{
					name: 'light',
					extend: lightTheme,
				},
			],
		}),
	],
};

export default config;
