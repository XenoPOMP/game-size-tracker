import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import seedColor from 'seed-color';

import GamesSection from '@components/GamesSection/GamesSection';
import Page from '@components/Page/Page';
import StateSuspense from '@components/StateSuspense/StateSuspense';

import AddNewGameSection from '@ui/AddNewGameSection/AddNewGameSection';
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
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<Page
			className={cn(styles.mainPage, className)}
			meta={loc.meta.mainPage}
			{...props}
		>
			<SizeDiagram
				className={cn('sticky top-0 left-0')}
				games={steamGames}
				isLoading={isLoading}
			/>

			{isLoading ? (
				'Loading...'
			) : (
				<>
					<section className={cn('flex flex-col gap-[1.5em]')}>
						<GamesSection games={steamGames} label={loc.groupNames.steam} />
					</section>
				</>
			)}

			<AddNewGameSection />
		</Page>
	);
};

export default MainPage;
