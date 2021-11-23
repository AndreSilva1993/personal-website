import '@src/theme/global-styles.css';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '@src/theme';
import { initI18n } from '@src/i18n/i18n';
import { PropsContextProvider } from '@src/contexts/PropsContext';
import { MainContainer } from '@src/components/MainContainer/MainContainer';

export default function App({ Component, pageProps }) {
  initI18n();
  const queryClient = new QueryClient();

  return (
    <PropsContextProvider props={pageProps}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MainContainer>
            <Component />
          </MainContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </PropsContextProvider>
  );
}
