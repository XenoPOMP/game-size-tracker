import { isUndefined, roundNumber } from '@xenopomp/advanced-utils';

interface FormatDecimalOptions {
	/**
	 * Separator between integer and fractional parts of a number.
	 * @default ','
	 */
	separator?: '.' | ',';
	/** Precision for number rounding. */
	roundPrecision?: number;
}

/**
 * This function formats decimal according to styles.
 *
 * @param target
 * @param options
 */
export const formatDecimal = (
	target: number,
	options?: FormatDecimalOptions
): string => {
	let formattedTarget = target.toString();

	if (isUndefined(options)) {
		return formattedTarget;
	}

	if (!isUndefined(options.roundPrecision)) {
		formattedTarget = roundNumber(
			+formattedTarget,
			options.roundPrecision
		).toString();
	}

	if (isUndefined(options.separator)) {
		options.separator = ',';
	}

	formattedTarget = formattedTarget.replace(/[\,\.]/g, options.separator);

	return formattedTarget;
};
