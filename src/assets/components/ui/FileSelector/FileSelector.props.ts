import { ComponentProps } from 'react';

import CustomButton from '@ui/CustomButton/CustomButton';

interface OnSelectProps {
	path: string | undefined;
}

export interface FileSelectorProps {
	placeholder?: string;
	onSelect?: (props: OnSelectProps) => void;
	buttons?: {
		notSelectedLabel?: string;
		selectedLabel?: string;
		// onClick?: ComponentProps<typeof CustomButton>['onClick'];
	};
	type?: 'file' | 'directory';
}
