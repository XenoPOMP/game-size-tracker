import { type Config } from 'tailwindcss';
import tailwindThemer from 'tailwindcss-themer';

import darkTheme from './themes/darkTheme';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],

	theme: {
		extend: {},
	},

	plugins: [
		tailwindThemer({
			defaultTheme: {
				extend: darkTheme,
			},
		}),
	],
};

export default config;
