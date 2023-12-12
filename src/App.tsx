import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'virtual:fonts.css';

import LibsPage from '@pages/LibsPage/LibsPage';
import MainPage from '@pages/MainPage/MainPage';
import SettingsPage from '@pages/SettingsPage/SettingsPage';

import './App.scss';

console.log(
	'[App.tsx]',
	`Hello world from Electron ${process.versions.electron}!`
);

function App() {
	return (
		<MemoryRouter>
			<Routes>
				<Route path={'/'} element={<MainPage />} />

				<Route path={'/settings'} element={<SettingsPage />} />

				<Route path={'/libs'} element={<LibsPage />} />
			</Routes>
		</MemoryRouter>
	);
}

export default App;
