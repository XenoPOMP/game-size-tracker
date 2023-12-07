import { Jsonish } from '@xenopomp/advanced-types';

type Config = Jsonish<{}>;

/**
 * This class allows to export and import app config (Redux state).
 */
class Configurator {
	private readonly fileExt = '.lcmm';

	private encode(target: string): string {
		return Buffer.from(target).toString('base64');
	}

	private decode(target: string): string {
		return Buffer.from(target, 'base64').toString('ascii');
	}

	public exportConfig(config: Config) {
		const encodedString = this.encode(JSON.stringify(config));

		console.log({
			encodedString,
			decodedString: this.decode(encodedString),
		});
	}
}

export default Configurator;
