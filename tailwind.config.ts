import { DeepPartial } from 'redux';
import { type Config } from 'tailwindcss';
import tailwindThemer from 'tailwindcss-themer';

const defaultTheme = {
	colors: {
		primary: 'rgb(23.000000528991222 29.000000171363354 37.00000159442425)',
		secondary: 'rgb(41.00000135600567 46.000001057982445 54.00000058114529)',
		'secondary-hover':
			'rgb(41.00000135600567 46.000001057982445 54.00000058114529)',
		brutal: 'rgb(29.325000531971455 31.123081147670746 34.00000177323818)',
		'tl-color': 'rgb(120.00000044703484 137.00000703334808 145.00000655651093)',
		'tl-hov-bg': 'rgb(61.00000016391277 68.00000354647636 80.00000283122063)',
		'tl-hov-color':
			'rgb(170.0000050663948 173.00000488758087 178.00000458955765)',
		'color-primary': 'rgb(255 255 255)',
		'color-secondary':
			'rgb(166.3255262374878 173.9518842101097 180.6249949336052)',
		confirm: 'rgb(26.000000350177288 159.0000057220459 255)',
		'confirm-brutal':
			'rgb(36.00989632308483 117.53204047679901 176.37499898672104)',
		'confirm-color': 'rgb(255 255 255)',
		'button-cancel-bg':
			'rgb(68.4692707657814 72.3753471672535 78.62500101327896)',
		'button-cancel-bg-brutal':
			'rgb(56.817188411951065 60.11093907058239 65.87499797344208)',
		'button-cancel-color': 'rgb(255 255 255)',
		'danger-bg': 'rgb(255 0 0)',
		'danger-brutal-bg':
			'rgb(153.00000607967377 17.850000075995922 17.850000075995922)',
		'danger-color': 'rgb(255 255 255)',
	},
};

type CustomTheme = typeof defaultTheme;

const lightTheme: DeepPartial<CustomTheme> = {
	colors: {
		primary: 'red',
	},
};

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
