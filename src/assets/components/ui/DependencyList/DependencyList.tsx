import { VariableFC } from '@xenopomp/advanced-types';

import cn from 'classnames';
import { FC } from 'react';

import ExternalLink from '@ui/ExternalLink/ExternalLink';

import styles from './DependencyList.module.scss';
import type { DependencyListProps } from './DependencyList.props';

const DependencyList: VariableFC<
	'article',
	DependencyListProps,
	'children'
> = ({ className, title, deps, ...props }) => {
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

					return (
						<div className={cn('flex flex-wrap gap-[.5em]')}>
							<ExternalLink
								to={getLinkToNpm()}
								applyStyles
								className={cn('flex-row-reverse')}
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

export default DependencyList;
