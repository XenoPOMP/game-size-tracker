import { FC } from 'react';

import { LoadingContextProvider } from '@contexts/Loading.context';

import BodyClassnameProvider from '@providers/BodyClassnameProvider/BodyClassnameProvider';
import { ProviderProps } from '@providers/Provider.props';
import SizesProvider from '@providers/SizesProvider/SizesProvider';
import ThemeProvider from '@providers/ThemeProvider/ThemeProvider';

const GlobalProvider: FC<ProviderProps> = ({ children }) => {
	return (
		<>
			<LoadingContextProvider>
				<BodyClassnameProvider>
					<SizesProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</SizesProvider>
				</BodyClassnameProvider>
			</LoadingContextProvider>
		</>
	);
};

export default GlobalProvider;
