import { CSSProperties, ComponentProps } from 'react';

import CustomButton from '@ui/CustomButton/CustomButton';

export interface CustomDialogProps {
	title?: string;

	/**
	 * Maximum width of inner body.
	 * @default lg (TailwindCSS)
	 */
	maxBodyWidth?: string | number;

	hideCloseButton?: boolean;

	buttons?: Array<
		Pick<
			ComponentProps<typeof CustomButton>,
			'variant' | 'children' | 'onClick' | 'blocked'
		>
	>;
}
