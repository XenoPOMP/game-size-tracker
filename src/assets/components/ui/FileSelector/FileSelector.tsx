import { FunctionalChildren, VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { fileDialog } from 'file-select-dialog';
import { FC, ReactNode, useEffect, useState } from 'react';
import selectFolder from 'win-select-folder';

import CustomButton from '@ui/CustomButton/CustomButton';

import styles from './FileSelector.module.scss';
import type { FileSelectorProps } from './FileSelector.props';

const FileSelector: VariableFC<
	'article',
	FileSelectorProps,
	'children' | 'onSelect'
> = ({
	className,
	placeholder,
	buttons,
	onSelect,
	type = 'file',
	...props
}) => {
	const [path, setPath] = useState<string | undefined>(undefined);

	const formatPath = (): ReactNode => {
		if (type === 'directory') {
			return path;
		}

		return path?.replace(/.*\\/g, '');
	};

	useEffect(() => {
		onSelect?.({ path });
	}, [path]);

	return (
		<article className={cn(styles.fileSelector, className)} {...props}>
			<div>{formatPath() ?? placeholder}</div>

			<CustomButton
				onClick={async ev => {
					// buttons?.onClick?.(ev);

					switch (type) {
						case 'file': {
							const fileList = await fileDialog({ multiple: false });

							setPath(fileList[0].path);
							break;
						}

						case 'directory': {
							const dir = await selectFolder({
								description: placeholder,
								newFolderButton: 0,
							});

							setPath(dir !== 'cancelled' ? dir : undefined);
							break;
						}
					}
				}}
				className={cn(styles.selectButton)}
			>
				{path === undefined
					? buttons?.notSelectedLabel
					: buttons?.selectedLabel}
			</CustomButton>
		</article>
	);
};

export default FileSelector;
