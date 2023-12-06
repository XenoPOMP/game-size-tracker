import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	ArrowUpWideNarrow,
	Eye,
	EyeOff,
} from 'lucide-react';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
	changeHiddenGamesVisibility,
	changeSortOrder,
} from '@redux/reducers/sortFilters.slice';

import Toggler from '@ui/Toggler/Toggler';

import useBoolean from '@hooks/useBoolean';

import styles from './FilterControls.module.scss';
import type { FilterControlsProps } from './FilterControls.props';

const FilterControls: VariableFC<
	'section',
	FilterControlsProps,
	'children'
> = ({ className, ...props }) => {
	const { showHidden, sortOrder } = useAppSelector(state => state.sortFilters);

	const dispatch = useAppDispatch();

	return (
		<section className={cn(styles.filterControls, className)} {...props}>
			<Toggler
				initialValue={showHidden}
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

			<Toggler
				initialValue={sortOrder === 'desc'}
				fillAlways
				onToggle={val => {
					if (val) {
						dispatch(changeSortOrder('desc'));
						return;
					}

					dispatch(changeSortOrder('asc'));
				}}
			>
				{({ isToggled }) => (
					<>
						<>
							{isToggled ? (
								<>
									<ArrowDownWideNarrow width={'100%'} height={'100%'} />
								</>
							) : (
								<>
									<ArrowUpNarrowWide width={'100%'} height={'100%'} />
								</>
							)}
						</>
					</>
				)}
			</Toggler>
		</section>
	);
};

export default FilterControls;
