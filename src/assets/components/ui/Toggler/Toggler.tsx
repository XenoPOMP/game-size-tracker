import { FunctionalChildren, VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC, ReactNode, useEffect } from 'react';

import useBoolean from '@hooks/useBoolean';

import styles from './Toggler.module.scss';
import type { TogglerProps } from './Toggler.props';

/**
 * Switch-type component. Can be toggled.
 *
 * @param className
 * @param children
 * @param initialValue
 * @param onToggle
 * @param onClick
 * @param props
 * @constructor
 *
 * @example
 * <Toggler
 *   initialValue={true}
 *   style={{
 *     lineHeight: '100%',
 *   }}
 *   onToggle={newValue => {
 *     console.log(newValue);
 * 	 }}
 * >
 * 	 {({ isToggled }) => {
 *     return <>{isToggled ? '+' : '-'}</>;
 *   }}
 * </Toggler>
 */
const Toggler: VariableFC<
	'button',
	TogglerProps & {
		children?: FunctionalChildren<[props: { isToggled: boolean }]>;
	},
	'children'
> = ({
	className,
	children,
	initialValue,
	onToggle,
	onClick,
	fillAlways,
	noToggle,
	style,
	...props
}) => {
	const [localValue, toggleLocalValue, setLocalValue] =
		useBoolean(initialValue);

	// Execute onToggle callback each time
	// component toggles.
	useEffect(() => {
		if (noToggle) {
			return;
		}

		onToggle?.(localValue);
	}, [localValue]);

	// If initial values changes, change local too.
	useEffect(() => {
		if (noToggle) {
			return;
		}

		if (initialValue !== undefined) {
			setLocalValue(initialValue);
		}
	}, [initialValue]);

	const toggledClassname = 'bg-tl-hov-bg text-tl-hov-color border-transparent';
	const untoggledClassname = 'text-tl-hov-color border-tl-hov-bg';

	return (
		<button
			className={cn(
				'min-w-[1.5em] min-h-[1.5em] flex justify-center items-center rounded-[.2em] p-[.3em]',

				localValue && !noToggle ? toggledClassname : untoggledClassname,
				fillAlways && 'bg-tl-hov-bg text-tl-hov-color border-transparent',

				// Button styles
				noToggle &&
					`${untoggledClassname} hover:bg-tl-hov-bg hover:text-tl-hov-color hover:border-transparent`,

				styles.toggler,

				// Default styles
				'w-[1.5em] h-[1.5em]',

				className
			)}
			onClick={ev => {
				onClick?.(ev);

				if (noToggle) {
					return;
				}

				toggleLocalValue();
			}}
			style={{
				lineHeight: '100%',
				...style,
			}}
			{...props}
		>
			{typeof children === 'function'
				? children({ isToggled: localValue })
				: children}
		</button>
	);
};

export default Toggler;
