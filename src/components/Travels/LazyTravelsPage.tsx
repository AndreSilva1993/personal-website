'use client';

import dynamic from 'next/dynamic';

export const LazyTravelsPage = dynamic(
  () => import('./TravelsPage').then(({ TravelsPage }) => TravelsPage),
  { ssr: false }
);
