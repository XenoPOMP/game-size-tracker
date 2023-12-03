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
				className={cn('sticky top-0 left-0')}
				games={[
					{
						title: 'Call of Duty: Modern Warfare III',
						size: 1000,
					},

					{
						title: 'Warzone 2.0',
						size: 200,
					},
				]}
			/>
		</Page>
	);
};

export default MainPage;
