import { VariableFC } from '@xenopomp/advanced-types';
import { getObjectKeys } from '@xenopomp/advanced-utils';

import { Menu } from '@headlessui/react';
import cn from 'classnames';
import { FC, Fragment } from 'react';

import FrameButton from '@ui/FrameButton/FrameButton';

import useAppSettings from '@hooks/useAppSettings';
import useLocalization from '@hooks/useLocalization';

import styles from './LanguageSwitcher.module.scss';
import type { LanguageSwitcherProps } from './LanguageSwitcher.props';

const LanguageSwitcher: VariableFC<
	typeof FrameButton,
	LanguageSwitcherProps,
	'children' | 'onClick'
> = ({ className, ...props }) => {
	const { language } = useAppSettings();

	const loc = useLocalization();

	const getLabel = (): string => {
		const labels: Record<ReturnType<typeof language.get>, string> = {
			en: 'ENG',
			ru: 'RUS',
		};

		return labels[language.get()];
	};

	return (
		<FrameButton className={cn(styles.languageSwitcher, className)} {...props}>
			<div
				className={'text-[10px] font-medium'}
				style={{
					lineHeight: '100%',
				}}
			>
				{getLabel()}
			</div>

			<div className={cn(styles.menu)}>
				{getObjectKeys(loc.languageLabels).map((key, index) => {
					return (
						<div
							className={cn(
								styles.button,
								language.get() === key && styles.active
							)}
							key={`lang-${key}-${index}`}
							onClick={() => {
								language.set(key);
							}}
						>
							{loc.languageLabels[key]}
						</div>
					);
				})}
			</div>
		</FrameButton>
	);
};

export default LanguageSwitcher;
