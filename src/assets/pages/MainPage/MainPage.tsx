import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';

import Page from '@components/Page/Page';

import SizeDiagram from '@ui/SizeDiagram/SizeDiagram';

import useLocalization from '@hooks/useLocalization';

import styles from './MainPage.module.scss';
import type { MainPageProps } from './MainPage.props';

const MainPage: VariableFC<typeof Page, MainPageProps, 'children' | 'meta'> = ({
	className,
	...props
}) => {
	const loc = useLocalization();

	return (
		<Page className={cn(className)} meta={loc.meta.mainPage} {...props}>
			<SizeDiagram
				games={[
					{
						title: 'Call of Duty: Modern Warfare III',
						size: 180.6,
					},

					{
						title: 'Warzone 2.0',
						size: 50,
					},
				]}
			/>
		</Page>
	);
};

export default MainPage;
