import '@src/theme/global-styles.css';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '@src/theme';
import { initI18n } from '@src/i18n/i18n';
import { MainContainer } from '@src/components/MainContainer/MainContainer';

export default function App({ Component, props }) {
  initI18n();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Component {...props} />
        </MainContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
