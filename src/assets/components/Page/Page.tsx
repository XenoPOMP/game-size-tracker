import { PropsWith } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';
import Helmet from 'react-helmet';

import Layout from '@components/Layout/Layout';

import useAppSettings from '@hooks/useAppSettings';

import styles from './Page.module.scss';
import { PageProps } from './Page.props';

/**
 * Component that provides page implementation.
 * Meta tag optimization included.
 *
 * @param {MetaInfo} meta            page meta info.
 * @param {ReactNode} children       page children component.
 * @param className				 					 classname that will be applied to
 * 																	 the main tag.
 * @constructor
 */
const Page: FC<PropsWith<'children' | 'className', PageProps>> = ({
	meta,
	children,
	className,
}) => {
	return (
		<Layout className={cn(styles.pageLayout)}>
			<Helmet>
				<title>{meta.title}</title>
				<meta name={'description'} content={meta.description} />
			</Helmet>

			<main className={cn(styles.pageMain, className)}>{children}</main>
		</Layout>
	);
};

export default Page;
