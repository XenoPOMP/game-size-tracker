import { Nullable, VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { ReactNode, useEffect, useState } from 'react';

import Item from '@pages/SettingsPage/Options/Item/Item';

import CustomButton from '@ui/CustomButton/CustomButton';

import styles from './Options.module.scss';
import { type OptionsItemProps, type OptionsProps } from './Options.props';

const Options: VariableFC<'div', OptionsProps> & {
	Group: VariableFC<'article', {}>;
	Header: VariableFC<'h3', {}>;
	Items: VariableFC<'div', {}>;
	Select: VariableFC<
		typeof Item,
		{
			initialValue?: string;
			options?: Array<{
				option: string;
				displayingName?: ReactNode;
			}>;
			onSelect?: (item: string) => void;
		},
		'children' | 'onSelect'
	>;
} = ({ className, children, ...props }) => {
	return (
		<div className={cn(styles.options, className)} {...props}>
			{children}
		</div>
	);
};

Options.Group = ({ className, children, ...props }) => {
	return (
		<article className={cn(styles.group, className)} {...props}>
			{children}
		</article>
	);
};

Options.Header = ({ className, children, ...props }) => {
	return (
		<h3 className={cn(styles.heading, className)} {...props}>
			{children}
		</h3>
	);
};

Options.Items = ({ className, children, ...props }) => {
	return (
		<div className={cn(styles.items, className)} {...props}>
			{children}
		</div>
	);
};

Options.Select = ({
	className,
	onSelect,
	options,
	initialValue,
	title,
	...props
}) => {
	const [localState, setLocalState] = useState<Nullable<string>>(
		initialValue ?? null
	);

	useEffect(() => {
		if (localState === null) {
			return;
		}

		onSelect?.(localState);
	}, [localState]);

	return (
		<>
			<Item title={title} className={cn(styles.select, className)} {...props}>
				<div className={cn(styles.grid)}>
					{options?.map(({ option, displayingName }, index) => {
						return (
							<CustomButton
								variant={localState === option ? 'primary' : 'cancel'}
								className={cn(
									'text-[.75em] flex items-center justify-center gap-[.3em]'
								)}
								key={`option-${index}`}
								onClick={() => {
									setLocalState(option);
								}}
							>
								{displayingName ?? option}
							</CustomButton>
						);
					})}
				</div>
			</Item>
		</>
	);
};

export default Options;
