import { getObjectKeys } from '@xenopomp/advanced-utils';

import { exec } from 'child_process';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { getAllFiles } from 'get-all-files';
import * as steamFolders from 'getsteamfolders';
import { getFolderSize, getFolderSizeBin } from 'go-get-folder-size';
import { release } from 'node:os';
import { join } from 'node:path';
import * as os from 'os';

import { preloadOptions } from '../preload/preload-options';

import { update } from './update';

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
	? join(process.env.DIST_ELECTRON, '../public')
	: process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = preloadOptions.usePreload
	? join(__dirname, '../preload/index.js')
	: '';
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

// App constants
/** Determines whether app frame will be rendered or not. */
const USE_FRAME = false;
/** Determines whether app will be transparent or not. */
const IS_TRANSPARENT = false;

async function createWindow() {
	win = new BrowserWindow({
		title: 'Main window',
		icon: join(process.env.PUBLIC, 'favicon.ico'),
		frame: USE_FRAME,
		transparent: IS_TRANSPARENT,
		minWidth: 404,
		minHeight: 556,
		webPreferences: {
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (url) {
		// electron-vite-vue#298
		win.loadURL(url);
		// Open devTool if the app is not packaged
		win.webContents.openDevTools();
	} else {
		win.loadFile(indexHtml);
	}

	win.on('maximize', () => {
		win?.webContents.send('get_fullscreen_status', true);
	});

	win.on('unmaximize', () => {
		win?.webContents.send('get_fullscreen_status', false);
	});

	// Test actively push message to the Electron-Renderer
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString());
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url);
		return { action: 'deny' };
	});

	// Apply electron-updater
	update(win);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	win = null;
	if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload,
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		childWindow.loadURL(`${url}#${arg}`);
	} else {
		childWindow.loadFile(indexHtml, { hash: arg });
	}
});

ipcMain.on('minimize_app', (_, arg) => {
	win?.minimize();
});

ipcMain.on('maximize_app', () => win?.maximize());

ipcMain.on('unmaximize_app', () => win?.unmaximize());

ipcMain.on('close_app', (_, arg) => {
	app.quit();
});

/**
 * Fetch game info asynchronously.
 * @param options
 */
const fetchGameInfo = async (
	options: Pick<GameInfo, 'pathTo' | 'category' | 'title' | 'uuid'>
): Promise<GameInfo> => {
	let size: number = -1;

	try {
		size = await getFolderSize(options.pathTo);
	} catch (e) {
		console.log(e);

		// console.log(`Error while fetching ${options.title} info: ${e}.`);
	}

	return {
		title: options.title,
		size,
		category: options.category,
		pathTo: options.pathTo,
		uuid: options.uuid,
	};
};

ipcMain.on('get-steam-games', async (_, arg) => {
	let response: GameInfo[] = [];

	const allSteamGames = await steamFolders.getAllSteamGames();

	const tasks = getObjectKeys(allSteamGames)
		.map(gameTitle => ({
			fullPath: allSteamGames[gameTitle],
			gameTitle,
		}))
		.map(async ({ fullPath, gameTitle }) => {
			const currentGame = await fetchGameInfo({
				title: gameTitle,
				pathTo: fullPath,
				category: 'steam',
			});

			response.push(currentGame);
		});

	await Promise.all(tasks);

	win?.webContents.send('get-steam-games-response', response);
});

ipcMain.on(
	'get-all-external-games-info',
	async (_, request: { path: string; uuid: string }[][]) => {
		let response: GameInfo[] = [];

		console.log(request);

		const tasks = request[0].map(async ({ path, uuid }, index) => {
			const currentGame = await fetchGameInfo({
				title: (path ?? '').replace(/.*\\/g, ''),
				category: 'other',
				pathTo: path,
				uuid,
			});

			response.push(currentGame);
		});

		await Promise.all(tasks);

		win?.webContents.send('get-all-external-games-info-response', response);
	}
);

ipcMain.on('reveal-in-explorer', async (_, arg) => {
	if (os.platform() === 'win32') {
		exec(`explorer "${arg}"`);
	} else {
		throw new Error(
			`For the moment reveal in explorer is not supported on ${os.platform()} platform.`
		);
	}
});
