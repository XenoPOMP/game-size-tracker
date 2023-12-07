import { ArrayType, Jsonish } from '@xenopomp/advanced-types';

import { join } from 'node:path';

import { CustomPathsState } from '@redux/reducers/customPaths.slice';

import FsManager from './fs-manager';

export type ConfiguratorConfig = Jsonish<{
	customPaths: {
		paths: Array<ArrayType<CustomPathsState['list']>['path']>;
		uuid: Array<ArrayType<CustomPathsState['list']>['uuid']>;
	};
}>;

/**
 * This class allows to export and import app config (Redux state).
 */
class Configurator {
	private readonly fsManager = new FsManager();

	private readonly fileExt = '.gst';

	private encode(target: string): string {
		return Buffer.from(target).toString('base64');
	}

	private decode(target: string): string {
		return Buffer.from(target, 'base64').toString('ascii');
	}

	public async exportConfig(
		config: ConfiguratorConfig,
		options: {
			path: string;
			fileName?: string;
		}
	) {
		const encodedString = this.encode(JSON.stringify(config));

		const outputFileName = join(
			options.path,
			`${options.fileName ?? 'Default config'}${this.fileExt}`
		);

		await this.fsManager.writeFile(outputFileName, encodedString);
	}

	public async importConfig(path: string): Promise<ConfiguratorConfig> {
		const decodedConfig: ConfiguratorConfig = JSON.parse(
			this.decode(await this.fsManager.readFile(path))
		);

		console.log(decodedConfig);

		return decodedConfig;
	}
}

export default Configurator;
