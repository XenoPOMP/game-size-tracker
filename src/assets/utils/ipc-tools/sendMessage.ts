import { ipcRenderer } from 'electron';

/**
 * Sends message to channel and return response by promise.
 *
 * @param channel
 *
 * @example
 * sendMessage<GameInfo[]>('get-steam-games')
 * 	.then(info => console.log(info))
 * 	.catch(() => console.error('Error while fetching Steam games'));
 */
export const sendMessage = <R extends any = unknown>(
	channel: string,
	...args: any[]
) => {
	return new Promise<R>((resolve, reject) => {
		console.log(`[${channel}] Sending request.`);

		ipcRenderer.send(channel, args);

		console.log(`[${channel}] Request sended.`);

		ipcRenderer.on(`${channel}-response`, (_, responseArgs) => {
			console.log(`[${channel}] Request resolved.`);

			resolve(responseArgs as R);
		});
	});
};
