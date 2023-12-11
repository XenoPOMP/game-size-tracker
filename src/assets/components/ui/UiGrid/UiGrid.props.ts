import { ComponentProps } from 'react';

import UiContainer from '@ui/UiContainer/UiContainer';
import { UiContainerProps } from '@ui/UiContainer/UiContainer.props';

export interface UiGridProps
	extends Partial<{
			columns: number;
			rows: number;
			gap: number | string;
		}>,
		UiContainerProps,
		ComponentProps<typeof UiContainer> {}
