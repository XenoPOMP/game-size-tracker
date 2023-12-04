import { CSSProperties } from 'react';

export interface CustomDialogProps {
	title?: string;

	/**
	 * Maximum width of inner body.
	 * @default lg (TailwindCSS)
	 */
	maxBodyWidth?: string | number;
}
