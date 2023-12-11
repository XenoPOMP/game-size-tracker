import createFile from 'create-file';
import { existsSync } from 'fs';

import { readFile, writeFile } from 'fs/promises';

class FsManager {
	async writeFile(path: string, content: string) {
		if (existsSync(path)) {
			await writeFile(path, content);
			return;
		}

		createFile(path, content, (err: any) => {
			if (err) {
				console.error(err);
			}
		});
	}

	async readFile(path: string) {
		return readFile(path, {
			encoding: 'ascii',
		});
	}
}

export default FsManager;
