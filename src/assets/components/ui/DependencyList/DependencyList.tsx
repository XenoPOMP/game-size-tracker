import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { Crown } from 'lucide-react';
import { FC } from 'react';

import ExternalLink from '@ui/ExternalLink/ExternalLink';
import LoadingRect from '@ui/LoadingRect/LoadingRect';

import styles from './DependencyList.module.scss';
import type { DependencyListProps } from './DependencyList.props';

const DependencyList: VariableFC<'article', DependencyListProps, 'children'> & {
	Loader: VariableFC<'article', {}, 'children'>;
} = ({ className, title, deps, myLibs, ...props }) => {
	return (
		<article className={cn(styles.dependencyList, className)} {...props}>
			{title && <h3>{title}</h3>}

			<div>
				{Object.entries(deps).map(([name, version]) => {
					const getLinkToNpm = (): string => {
						if (version === 'latest') {
							return `https://www.npmjs.com/package/${name}`;
						}

						return `https://www.npmjs.com/package/${name}/v/${version.replace(
							/^\^/gi,
							''
						)}`;
					};

					const ownLibs = /(@xenopomp).*/gi;

					return (
						<div className={cn('flex flex-wrap gap-[.5em]')}>
							<ExternalLink
								to={getLinkToNpm()}
								applyStyles
								className={cn('flex-row-reverse')}
								leftIcon={
									ownLibs.test(name) || myLibs?.includes(name)
										? Crown
										: undefined
								}
							>
								<div className={cn('')}>{name}</div>
							</ExternalLink>

							<div className={cn('text-color-secondary')}>{version}</div>
						</div>
					);
				})}
			</div>
		</article>
	);
};

DependencyList.Loader = ({ className, ...props }) => {
	return (
		<article className={cn(styles.dependencyList, className)} {...props}>
			<LoadingRect className={'text-[1.5em] !h-[1em] !w-[12ch]'} />

			<div className={cn('flex flex-col gap-[.5em]')}>
				<LoadingRect className={'text-[1em] !h-[1em] !w-[20ch]'} />
				<LoadingRect className={'text-[1em] !h-[1em] !w-[24ch]'} />
				<LoadingRect className={'text-[1em] !h-[1em] !w-[16ch]'} />
			</div>
		</article>
	);
};

export default DependencyList;
