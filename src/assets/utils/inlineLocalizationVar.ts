import { getObjectKeys } from '@xenopomp/advanced-utils';

/**
 *
 * @param target
 * @param vars
 *
 * @example
 * // Wrap variables in {{...}}
 * inlineLocalizationVar(`{{title}}/groups/{{index}}`, {
 *   title: 'THIS IS AMAZING',
 *   index: `${12}`,
 * });
 */
export const inlineLocalizationVar = (
	target: string,
	vars: Record<string, string>
) => {
	getObjectKeys(vars).forEach(varName => {
		const pattern = new RegExp(`\{\{${varName}\}\}`);

		target = target.replace(pattern, vars[varName]);
	});

	return target;
};
