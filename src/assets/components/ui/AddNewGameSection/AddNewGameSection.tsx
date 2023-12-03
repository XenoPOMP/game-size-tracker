import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { Plus } from 'lucide-react';
import { FC } from 'react';

import styles from './AddNewGameSection.module.scss';
import type { AddNewGameSectionProps } from './AddNewGameSection.props';

const AddNewGameSection: VariableFC<
	'section',
	AddNewGameSectionProps,
	'children'
> = ({ className, ...props }) => {
	return (
		<section className={cn(styles.addNew, className)} {...props}>
			<button className={cn(styles.newButton)}>
				<Plus width={'1.2em'} height={'1.2em'} />
			</button>
		</section>
	);
};

export default AddNewGameSection;
