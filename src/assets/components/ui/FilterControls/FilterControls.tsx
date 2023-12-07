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

import useAppSettings from '@hooks/useAppSettings';
import useBoolean from '@hooks/useBoolean';

import { sendMessage } from '@utils/ipc-tools/sendMessage';

import { ConfiguratorConfig } from '../../../../../electron/assets/utils/configurator';

import styles from './FilterControls.module.scss';
import type { FilterControlsProps } from './FilterControls.props';

const FilterControls: VariableFC<
	'section',
	FilterControlsProps,
	'children'
> = ({ className, ...props }) => {
	const { language } = useAppSettings();
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
					accept={['.gst']}
					hidePath
					onSelect={({ path }) => {
						sendMessage<ConfiguratorConfig>('import-config', path).then(res => {
							console.log({
								receivedConfig: res,
							});
						});
					}}
				/>

				<FileSelector
					buttons={{
						notSelectedLabel: <FileUp width={'100%'} height={'100%'} />,
						selectedLabel: <FileUp width={'100%'} height={'100%'} />,
					}}
					buttonElement={DisabledToggler}
					type={'directory'}
					hidePath
					onSelect={({ path }) => {
						if (path === undefined) {
							return;
						}

						const config: ConfiguratorConfig = {
							language: language.get(),
						};

						sendMessage('export-config', path, config);
					}}
				/>
			</article>
		</section>
	);
};

export default FilterControls;
