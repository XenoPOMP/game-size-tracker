import { Defined, SelectivePartial } from '@xenopomp/advanced-types';

import { fileDialog } from 'file-select-dialog';
import { ComponentProps, ElementType, ReactNode } from 'react';

import CustomButton from '@ui/CustomButton/CustomButton';
import DisabledToggler from '@ui/DisabledToggler/DisabledToggler';
import Toggler from '@ui/Toggler/Toggler';

interface OnSelectProps {
	path: string | undefined;
}

export interface FileSelectorProps
	extends SelectivePartial<
		Pick<Defined<Parameters<Awaited<typeof fileDialog>>[0]>, 'accept'>,
		'accept'
	> {
	placeholder?: string;

	onSelect?: (props: OnSelectProps) => void;
	buttons?: {
		notSelectedLabel?: ReactNode;
		selectedLabel?: ReactNode;
		// onClick?: ComponentProps<typeof CustomButton>['onClick'];
	};

	type?: 'file' | 'directory';
	hidePath?: boolean;
	buttonElement?: typeof CustomButton | typeof DisabledToggler;
}
