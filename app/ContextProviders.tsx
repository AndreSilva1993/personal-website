'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { initI18next } from '@src/i18n/client';
import { PropsWithChildren } from 'react';

export function ContextProviders({ children }: PropsWithChildren) {
  initI18next();
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
