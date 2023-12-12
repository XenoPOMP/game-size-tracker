import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { MoveLeft } from 'lucide-react';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoadingRect from '@ui/LoadingRect/LoadingRect';

import useLocalization from '@hooks/useLocalization';

import styles from './GoBack.module.scss';
import type { GoBackProps } from './GoBack.props';

const GoBack: VariableFC<'a', GoBackProps, 'href' | 'hrefLang' | 'children'> & {
	Loader: VariableFC<typeof LoadingRect, {}>;
} = ({ className, onClick, ...props }) => {
	const navigate = useNavigate();
	const loc = useLocalization();

	return (
		<a
			className={cn(styles.goBack, styles.goBack, className)}
			onClick={ev => {
				onClick?.(ev);

				navigate(-1);
			}}
			{...props}
		>
			<MoveLeft width={'.9em'} />
			{loc.pages.options.goBack}
		</a>
	);
};

GoBack.Loader = ({ className, style, ...props }) => {
	return (
		<LoadingRect
			className={cn('!h-[1.2em]', className)}
			style={{
				width: 'calc(5ch + .9em)',
				...style,
			}}
			{...props}
		/>
	);
};

export default GoBack;
