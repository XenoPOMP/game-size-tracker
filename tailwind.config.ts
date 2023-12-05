import { type Config } from 'tailwindcss';
import tailwindThemer from 'tailwindcss-themer';

import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],

	theme: {
		extend: darkTheme,
	},

	plugins: [
		tailwindThemer({
			themes: [
				{
					name: 'dark',
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
