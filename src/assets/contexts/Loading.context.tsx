import { PropsWith, VariableFC } from '@xenopomp/advanced-types';

import { FC, createContext } from 'react';

import useBoolean from '@hooks/useBoolean';

const LoadingContext = createContext<{
	isLoading: boolean;
	setIsLoading: (newValue: boolean) => void;
}>({ isLoading: false, setIsLoading: prev => false });

export const LoadingContextProvider: VariableFC<
	typeof LoadingContext.Provider,
	{},
	'value'
> = ({ children, ...props }) => {
	const [isLoading, toggleIsLoading, setIsLoading] = useBoolean(false);

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				setIsLoading: newValue => {
					setIsLoading(newValue);
				},
			}}
		>
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingContext;
