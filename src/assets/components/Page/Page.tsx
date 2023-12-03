import { PropsWith, VariableFC } from '@xenopomp/advanced-types';

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
const Page: VariableFC<typeof Layout, PageProps> = ({
	meta,
	children,
	className,
	...props
}) => {
	return (
		<Layout className={cn(styles.pageLayout)} {...props}>
			<Helmet>
				<title>{meta.title}</title>
				<meta name={'description'} content={meta.description} />
			</Helmet>

			<main className={cn(styles.pageMain, className)}>{children}</main>
		</Layout>
	);
};

export default Page;
