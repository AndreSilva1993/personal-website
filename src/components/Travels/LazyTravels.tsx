import dynamic from 'next/dynamic';

const LazyTravels = dynamic(() => import('./Travels'), { ssr: false });

export { LazyTravels };
