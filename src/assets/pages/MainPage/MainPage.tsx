import { VariableFC } from '@xenopomp/advanced-types';
import { capitalize } from '@xenopomp/advanced-utils';

import { GameInfo, OfficialProvider } from '@type/GameInfo';
import cn from 'classnames';
import { Dispatch, useCallback, useContext, useEffect, useState } from 'react';

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

	/**
	 * This function checks for cache. If cache exists, it cancels size
	 * recalculation.
	 */
	const checkForCache = useCallback(
		({
			provider,
			action,
			dispatchAction,
			channel,
		}: {
			/** Name of game provider. */
			provider: OfficialProvider;

			/** React state Dispatch action. */
			action: Dispatch<GameInfo[] | undefined>;

			/** RTK dispatch action. */
			dispatchAction: typeof cacheSteamGames | typeof cacheEgsGames;

			/** IPC channel for sending message. */
			channel: string;
		}) => {
			/** Check if cache is already created in RTK store. */
			if (cache.officialGames[provider] !== null) {
				console.log(
					`[CACHE] ${capitalize(provider.toLowerCase())} cache detected.`
				);

				action(cache.officialGames[provider] ?? []);
				return;
			}

			/**
			 * If cache has not been created yet,
			 * create it and set local state to cache.
			 */
			sendMessage<GameInfo[]>(channel).then(gameArray => {
				action(gameArray);
				dispatch(dispatchAction(gameArray));
			});
		},
		[cache]
	);

	// Load games from main process
	useEffect(() => {
		setIsLoading(true);

		const tasks: Array<Promise<void>> = [
			(async () => {
				checkForCache({
					provider: 'steam',
					action: setSteamGames,
					dispatchAction: cacheSteamGames,
					channel: 'get-steam-games',
				});
			})(),

			(async () => {
				checkForCache({
					provider: 'egs',
					action: setEgsGames,
					dispatchAction: cacheEgsGames,
					channel: 'get-egs-games',
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
