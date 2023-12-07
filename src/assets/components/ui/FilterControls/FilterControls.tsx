import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	ArrowUpWideNarrow,
	Eye,
	EyeOff,
	FileDown,
	FileUp,
	Import,
} from 'lucide-react';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
	changeHiddenGamesVisibility,
	changeSortOrder,
} from '@redux/reducers/sortFilters.slice';

import DisabledToggler from '@ui/DisabledToggler/DisabledToggler';
import FileSelector from '@ui/FileSelector/FileSelector';
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
			<article className={cn(styles.group)}>
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
			</article>

			<article className={cn(styles.group)}>
				<FileSelector
					buttons={{
						notSelectedLabel: <Import width={'100%'} height={'100%'} />,
						selectedLabel: <Import width={'100%'} height={'100%'} />,
					}}
					buttonElement={DisabledToggler}
					type={'file'}
					accept={['.lcmm']}
					hidePath
				/>

				<FileSelector
					buttons={{
						notSelectedLabel: <FileUp width={'100%'} height={'100%'} />,
						selectedLabel: <FileUp width={'100%'} height={'100%'} />,
					}}
					buttonElement={DisabledToggler}
					type={'directory'}
					hidePath
				/>
			</article>
		</section>
	);
};

export default FilterControls;
