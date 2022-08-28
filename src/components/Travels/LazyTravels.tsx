import dynamic from 'next/dynamic';

const LazyTravels = dynamic(() => import('./TravelsPage').then(({ TravelsPage }) => TravelsPage), {
  ssr: false,
});

export { LazyTravels };
