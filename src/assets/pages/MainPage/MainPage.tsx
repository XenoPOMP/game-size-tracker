import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';

import GamesSection from '@components/GamesSection/GamesSection';
import Page from '@components/Page/Page';

import LoadingContext from '@contexts/Loading.context';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { cacheEgsGames, cacheSteamGames } from '@redux/reducers/cache.slice';

import AddNewGameSection from '@ui/AddNewGameSection/AddNewGameSection';
import FilterControls from '@ui/FilterControls/FilterControls';
import SizeDiagram from '@ui/SizeDiagram/SizeDiagram';
import UiContainer from '@ui/UiContainer/UiContainer';

import useLocalization from '@hooks/useLocalization';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

import styles from './MainPage.module.scss';
import type { MainPageProps } from './MainPage.props';

const MainPage: VariableFC<typeof Page, MainPageProps, 'children' | 'meta'> = ({
	className,
	...props
}) => {
	const loc = useLocalization();
	const dispatch = useAppDispatch();
	const cache = useAppSelector(state => state.cache);

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	const [steamGames, setSteamGames] = useState<GameInfo[]>();
	const [egsGames, setEgsGames] = useState<GameInfo[]>();
	const [otherGames, setOtherGames] = useState<GameInfo[]>();
	const [allGames, setAllGames] = useState<GameInfo[]>();

	const customPaths = useAppSelector(state => state.customPaths.list);

	// Load games from main process
	useEffect(() => {
		setIsLoading(true);

		const tasks: Array<Promise<void>> = [
			(async () => {
				if (cache.officialGames.steam !== null) {
					console.log(`[CACHE] Steam cache detected.`);

					setSteamGames(cache.officialGames.steam);
					return;
				}

				sendMessage<GameInfo[]>('get-steam-games').then(gameArray => {
					setSteamGames(gameArray);
					dispatch(cacheSteamGames(gameArray));
				});
			})(),

			(async () => {
				if (cache.officialGames.egs !== null) {
					console.log(`[CACHE] EGS cache detected.`);

					setEgsGames(cache.officialGames.egs);
					return;
				}

				sendMessage<GameInfo[]>('get-egs-games').then(gameArray => {
					setEgsGames(gameArray);
					dispatch(cacheEgsGames(gameArray));
				});
			})(),

			sendMessage<GameInfo[]>('get-all-external-games-info', customPaths).then(
				gameArray => {
					setOtherGames(gameArray);
				}
			),
		];

		Promise.all(tasks)
			.catch()
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	// Concat all games in one array
	useEffect(() => {
		setAllGames([
			...(steamGames ?? []),
			...(egsGames ?? []),
			...(otherGames ?? []),
		]);
	}, [steamGames, egsGames, otherGames]);

	// Reload custom games
	useEffect(() => {
		setIsLoading(true);

		const tasks: Array<Promise<void>> = [
			sendMessage<GameInfo[]>('get-all-external-games-info', customPaths)
				.then(gameArray => {
					setOtherGames(gameArray);
				})
				.catch(),
		];

		Promise.all(tasks)
			.catch()
			.finally(() => {
				setIsLoading(false);
			});
	}, [customPaths]);

	return (
		<Page
			className={cn(styles.mainPage, className)}
			meta={loc.meta.mainPage}
			{...props}
		>
			<UiContainer>
				<SizeDiagram
					className={cn('sticky top-0 left-0')}
					games={allGames}
					isLoading={isLoading}
				/>

				<FilterControls />

				{isLoading ? (
					<section className={cn('flex flex-col gap-[1.5em]')}>
						<GamesSection.Loader />
						<GamesSection.Loader />
					</section>
				) : (
					<>
						<section className={cn('flex flex-col gap-[1.5em]')}>
							<GamesSection games={steamGames} label={loc.groupNames.steam} />
							<GamesSection games={egsGames} label={loc.groupNames.egs} />
							<GamesSection games={otherGames} label={loc.groupNames.other} />
						</section>

						<AddNewGameSection />
					</>
				)}
			</UiContainer>
		</Page>
	);
};

export default MainPage;
