interface TravelCity {
  name: string;
  image: string;
  places: TravelPlace[];
}

interface TravelPlace {
  name: string;
  coordinates: number[];
  description?: string;
  image?: { url: string; landscape: boolean };
}

interface TravelsFlagsProps {
  flags: Array<{ name: string; image: string; active: boolean }>;
  onFlagClick: (index: number) => void;
}

export type { TravelCity, TravelPlace, TravelsFlagsProps };
