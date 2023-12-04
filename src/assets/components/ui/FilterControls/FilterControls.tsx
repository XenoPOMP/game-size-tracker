import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import { FC } from 'react';

import Toggler from '@ui/Toggler/Toggler';

import styles from './FilterControls.module.scss';
import type { FilterControlsProps } from './FilterControls.props';

const FilterControls: VariableFC<
	'section',
	FilterControlsProps,
	'children'
> = ({ className, ...props }) => {
	return (
		<section className={cn(styles.filterControls, className)} {...props}>
			<Toggler
				initialValue={true}
				style={{
					lineHeight: '100%',
				}}
				className={cn('w-[1.5em] h-[1.5em]')}
				onToggle={newValue => {
					console.log(`Toggled visibility toggler. New value => ${newValue}`);
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
