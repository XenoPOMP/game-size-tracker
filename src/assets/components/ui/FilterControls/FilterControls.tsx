import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { changeHiddenGamesVisibility } from '@redux/reducers/sortFilters.slice';

import Toggler from '@ui/Toggler/Toggler';

import styles from './FilterControls.module.scss';
import type { FilterControlsProps } from './FilterControls.props';

const FilterControls: VariableFC<
	'section',
	FilterControlsProps,
	'children'
> = ({ className, ...props }) => {
	const { showHidden } = useAppSelector(state => state.sortFilters);

	const dispatch = useAppDispatch();

	return (
		<section className={cn(styles.filterControls, className)} {...props}>
			<Toggler
				initialValue={showHidden}
				style={{
					lineHeight: '100%',
				}}
				className={cn('w-[1.5em] h-[1.5em]')}
				onToggle={newValue => {
					dispatch(changeHiddenGamesVisibility(newValue));
				}}
			>
				{({ isToggled }) => {
					return (
						<>
							{isToggled ? (
								<>
									<Eye width={'100%'} height={'100%'} />
								</>
							) : (
								<>
									<EyeOff width={'100%'} height={'100%'} />
								</>
							)}
						</>
					);
				}}
			</Toggler>
		</section>
	);
};

export default FilterControls;
