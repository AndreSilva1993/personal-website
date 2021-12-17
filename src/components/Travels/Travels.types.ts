interface ITravelCountry {
  name: string;
  code: string;
  image: string;
}

interface ITravelCity {
  name: string;
  image: string;
  countryCode: string;
  places: ITravelPlace[];
}

interface ITravelPlace {
  name: string;
  coordinates: number[];
  description?: string;
  images?: Array<{ url: string; landscape: boolean }>;
}

interface TravelCountriesProps {
  countries: ITravelCountry[];
  activeCountry: ITravelCountry;
  onCountryClick: (index?: number) => void;
}

interface TravelCitiesProps {
  cities: ITravelCity[];
  onCityClick: (index: number) => void;
}

interface TravelCityProps {
  city: ITravelCity;
  place: ITravelPlace;
  onGoBackButtonClick: () => void;
  onCarouselPlaceChange: (name: string) => void;
}

export type {
  ITravelCountry,
  ITravelCity,
  ITravelPlace,
  TravelCountriesProps,
  TravelCityProps,
  TravelCitiesProps,
};
