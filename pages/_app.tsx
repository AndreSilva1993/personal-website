import '@src/theme/global-styles.css';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '@src/theme';
import { initI18n } from '@src/i18n/i18n';
import { PropsContextProvider } from '@src/contexts/PropsContext';
import { MainContainer } from '@src/components/MainContainer/MainContainer';
import { PageProgressBar } from '@src/components/PageProgressBar/PageProgressBar';

export default function App({ Component, pageProps }) {
  initI18n();
  const router = useRouter();
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    const handleRouteStart = () => setIsLoadingPage(true);
    const handleRouteEnd = () => setIsLoadingPage(false);

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeError', handleRouteEnd);
    router.events.on('routeChangeComplete', handleRouteEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeError', handleRouteEnd);
      router.events.off('routeChangeComplete', handleRouteEnd);
    };
  }, [router]);

  const queryClient = new QueryClient();

  return (
    <PropsContextProvider props={pageProps}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PageProgressBar loading={isLoadingPage} />
          <MainContainer>
            <Component />
          </MainContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </PropsContextProvider>
  );
}
