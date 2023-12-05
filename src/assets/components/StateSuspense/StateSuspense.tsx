import { VariableFC } from '@xenopomp/advanced-types';

import { Fragment, Suspense } from 'react';

import type { StateSuspenseProps } from './StateSuspense.props';

const StateSuspense: VariableFC<typeof Suspense, StateSuspenseProps> = ({
	children,
	fallback,
	isLoading,
}) => {
	return <>{!isLoading ? children : fallback}</>;
};

export default StateSuspense;
