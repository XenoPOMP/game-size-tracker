export interface TogglerProps {
	initialValue?: boolean;

	/** If true, will fill background always. */
	fillAlways?: boolean;

	/** If true, component will behave as button. */
	noToggle?: boolean;

	onToggle?: (newValue: boolean) => void;
}
