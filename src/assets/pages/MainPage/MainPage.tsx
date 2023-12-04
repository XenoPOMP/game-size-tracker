import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import GamesSection from '@components/GamesSection/GamesSection';
import Page from '@components/Page/Page';

import AddNewGameSection from '@ui/AddNewGameSection/AddNewGameSection';
import FilterControls from '@ui/FilterControls/FilterControls';
import SizeDiagram from '@ui/SizeDiagram/SizeDiagram';

import useBoolean from '@hooks/useBoolean';
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
	const [otherGames, setOtherGames] = useState<GameInfo[]>();
	const [allGames, setAllGames] = useState<GameInfo[]>();

	// Load games from main process
	useEffect(() => {
		setIsLoading(true);

		const tasks: Array<Promise<void>> = [
			sendMessage<GameInfo[]>('get-steam-games')
				.then(gameArray => {
					setSteamGames(gameArray);
				})
				.catch(),
		];

		Promise.all(tasks).finally(() => {
			setIsLoading(false);
		});
	}, []);

	// Concat all games in one array
	useEffect(() => {
		setAllGames([...(steamGames ?? []), ...(otherGames ?? [])]);
	}, [steamGames, otherGames]);

	return (
		<Page
			className={cn(styles.mainPage, className)}
			meta={loc.meta.mainPage}
			{...props}
		>
			<SizeDiagram
				className={cn('sticky top-0 left-0')}
				games={allGames}
				isLoading={isLoading}
			/>

			<FilterControls />

			{isLoading ? (
				<></>
			) : (
				<>
					<section className={cn('flex flex-col gap-[1.5em]')}>
						<GamesSection games={steamGames} label={loc.groupNames.steam} />
						<GamesSection games={otherGames} label={loc.groupNames.other} />
					</section>

					<AddNewGameSection />
				</>
			)}
		</Page>
	);
};

export default MainPage;
