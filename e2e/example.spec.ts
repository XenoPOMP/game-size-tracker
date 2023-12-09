import { _electron as electron, expect, test } from '@playwright/test';
import { randomUUID } from 'crypto';

import { initialAppSettings } from '../src/assets/redux/reducers/appSettingsSlice';

test('App runs without crashes.', async ({}) => {
	const timestamp = Date.now().toString();

	const app = await electron.launch({ args: ['.', '--no-sandbox'] });
	const page = await app.firstWindow();

	// expect(await page.title()).toBe(initialAppSettings.appName);

	await page.screenshot({
		path: `e2e/screenshots/test-${timestamp}.png`,
	});
});
