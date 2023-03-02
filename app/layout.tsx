'use client';

import '@src/theme/global-styles.css';
import '@src/theme/variables.css';

import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { initI18next } from '@src/i18n/client';
import { MainContainer } from '@src/components/MainContainer/MainContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  initI18next();
  const queryClient = new QueryClient();

  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" />
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap`}
        />
      </head>
      <body>
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <MainContainer>{children}</MainContainer>
        </QueryClientProvider>
      </body>
    </html>
  );
}
