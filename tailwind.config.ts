import { type Config } from 'tailwindcss';
import tailwindThemer from 'tailwindcss-themer';

import defaultTheme from './themes/defaultTheme';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],

	theme: {
		extend: {},
	},

	plugins: [
		tailwindThemer({
			defaultTheme: {
				extend: defaultTheme,
			},
		}),
	],
};

export default config;
