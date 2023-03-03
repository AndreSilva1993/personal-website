import '@src/theme/global-styles.css';
import '@src/theme/variables.css';

import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import { MainContainer } from '@src/components/MainContainer/MainContainer';
import { ContextProviders } from './ContextProviders';

export const metadata: Metadata = {
  title: {
    default: 'André Silva',
    template: '%s | André Silva',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <ContextProviders>
          <MainContainer>{children}</MainContainer>
        </ContextProviders>
      </body>
    </html>
  );
}
