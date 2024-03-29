import { LucideIcon, icons } from 'lucide-react';

export interface ExternalLinkProps {
	applyStyles?: boolean;

	/** If true, this link will act as react-router-dom`s Link component. */
	useRouter?: boolean;

	/**
	 * Pass icon component from "lucide-dev"
	 * as prop.
	 *
	 * @example
	 * import { Code2 } from 'lucide-react';
	 *
	 * <ExternalLink
	 *   applyStyles
	 *   className={cn('text-[.85em]')}
	 *   to={'https://github.com/XenoPOMP/game-size-tracker'}
	 *   icon={Code2}
	 * >
	 *   <>{...}</>
	 * </ExternalLink>
	 */
	icon?: LucideIcon;

	leftIcon?: LucideIcon;
}
