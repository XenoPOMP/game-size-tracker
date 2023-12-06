export interface TogglerProps {
	initialValue?: boolean;

	/** If true, will fill background always. */
	fillAlways?: boolean;

	onToggle?: (newValue: boolean) => void;
}
