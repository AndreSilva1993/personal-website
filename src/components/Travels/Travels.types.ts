export interface ITravel {
  name: string;
  image: string;
  countryCodes: string[];
  places: ITravelPlace[];
}

export interface ITravelPlace {
  name: string;
  coordinates: number[];
  images: Array<{ url: string; landscape: boolean }>;
}
