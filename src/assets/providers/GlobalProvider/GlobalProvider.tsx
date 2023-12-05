import { FC } from 'react';

import { LoadingContextProvider } from '@contexts/Loading.context';

import AppContextsProvider from '@providers/AppContextsProvider/AppContextsProvider';
import BodyClassnameProvider from '@providers/BodyClassnameProvider/BodyClassnameProvider';
import { ProviderProps } from '@providers/Provider.props';
import SizesProvider from '@providers/SizesProvider/SizesProvider';
import ThemeProvider from '@providers/ThemeProvider/ThemeProvider';

const GlobalProvider: FC<ProviderProps> = ({ children }) => {
	return (
		<>
			<AppContextsProvider>
				<BodyClassnameProvider>
					<SizesProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</SizesProvider>
				</BodyClassnameProvider>
			</AppContextsProvider>
		</>
	);
};

export default GlobalProvider;
