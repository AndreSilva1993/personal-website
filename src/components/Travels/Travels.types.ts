interface TravelCountry {
  name: string;
  flagImage: string;
  cities: TravelCity[];
}

interface TravelCity {
  name: string;
  places: TravelPlace[];
}

interface TravelPlace {
  name: string;
  image?: string;
  description?: string;
  coordinates: number[];
}

interface TravelsFlagsProps {
  flags: Array<{ name: string; image: string; active: boolean }>;
  onFlagClick: (index: number) => void;
}

export type { TravelCountry, TravelCity, TravelPlace, TravelsFlagsProps };
