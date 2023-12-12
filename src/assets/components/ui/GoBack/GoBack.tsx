import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { MoveLeft } from 'lucide-react';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useLocalization from '@hooks/useLocalization';

import styles from './GoBack.module.scss';
import type { GoBackProps } from './GoBack.props';

const GoBack: VariableFC<
	'a',
	GoBackProps,
	'href' | 'hrefLang' | 'children'
> = ({ className, onClick, ...props }) => {
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

export default GoBack;
