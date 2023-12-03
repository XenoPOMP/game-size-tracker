import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import seedColor from 'seed-color';

import Page from '@components/Page/Page';
import StateSuspense from '@components/StateSuspense/StateSuspense';

import SizeDiagram from '@ui/SizeDiagram/SizeDiagram';

import useBoolean from '@hooks/useBoolean';
import useFormattedSize from '@hooks/useFormattedSize';
import useLocalization from '@hooks/useLocalization';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

import styles from './MainPage.module.scss';
import type { MainPageProps } from './MainPage.props';

const MainPage: VariableFC<typeof Page, MainPageProps, 'children' | 'meta'> = ({
	className,
	...props
}) => {
	const loc = useLocalization();

	const [isLoading, toggleIsLoading, setIsLoading] = useBoolean(false);
	const [steamGames, setSteamGames] = useState<GameInfo[]>();

	useEffect(() => {
		setIsLoading(true);

		sendMessage<GameInfo[]>('get-steam-games')
			.then(gameArray => {
				setSteamGames(gameArray);
			})
			.catch()
			.finally(() => {});

		setIsLoading(false);
	}, []);

	return (
		<Page className={cn(className)} meta={loc.meta.mainPage} {...props}>
			<SizeDiagram
				className={cn('sticky top-0 left-0')}
				games={steamGames}
				isLoading={isLoading}
			/>

			{isLoading && 'Loading...'}

			{steamGames?.map(({ title, size }) => {
				const seededColor = seedColor(title);

				return (
					<div className={cn('flex gap-x-[.5em] items-center')}>
						<div
							className={'h-[10px] aspect-square'}
							style={{
								background: seededColor.toHex(),
							}}
						></div>{' '}
						<div>
							{title} | {size / 1024 ** 2} MB
						</div>
					</div>
				);
			})}
		</Page>
	);
};

export default MainPage;
