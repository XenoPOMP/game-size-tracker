import { summary } from '@xenopomp/advanced-utils';

import { readdirSync, statSync } from 'fs';
import * as path from 'path';

export const dirSizeSync = (directory: string) => {
	const files = readdirSync(directory);
	const sizes = files
		.map(file => statSync(path.join(directory, file)))
		.map(stat => stat.size);

	return summary(...sizes);
};
