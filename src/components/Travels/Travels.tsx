import 'leaflet/dist/leaflet.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useMemo, useState } from 'react';

import { TravelCity } from '@src/components/Travels/TravelCity';
import { TravelCities } from '@src/components/Travels/TravelCities';
import { TravelCountries } from '@src/components/Travels/TravelCountries';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';
import type { ITravelCity, ITravelPlace, ITravelCountry } from './Travels.types';

const StyledPageContainer = styled(PageContainer)`
  margin: 0 auto;
  max-width: 150rem;
`;

const TravelH1 = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 3rem;
    text-align: center;
    font-weight: ${theme.fontWeights.boldest};
  `
);

const MapContainerDiv = styled.div(
  ({ theme }) => css`
    width: 100%;
    aspect-ratio: 16 / 6;
    margin-bottom: 1rem;
    z-index: 0;

    ${theme.media.lteExtraSmall} {
      aspect-ratio: 4 / 3;
    }
  `
);

const Travels: FC = () => {
  const leafletMapRef = useRef<L.Map>();
  const leafletMarkersRef = useRef<L.Marker[]>([]);
  const leafletMapContainerRef = useRef<HTMLDivElement>();

  const cities = useMemo<ITravelCity[]>(() => travelsJSON.travels, []);
  const countries = useMemo<ITravelCountry[]>(() => travelsJSON.countries, []);

  const [activeCity, setActiveCity] = useState<ITravelCity>();
  const [activePlace, setActivePlace] = useState<ITravelPlace>();
  const [activeCountry, setActiveCountry] = useState<ITravelCountry>(() => countries[0]);
  const [filteredCities, setFilteredCities] = useState<ITravelCity[]>(() => cities);

  function handleCountryClick(index: number) {
    setActiveCountry(countries[index]);
    setActiveCity(undefined);
    setActivePlace(undefined);
  }

  function handleCityClick(index: number) {
    const selectedCity = filteredCities[index];

    setActiveCountry(countries.find(({ code }) => code === selectedCity.countryCode));
    setActiveCity(selectedCity);
    setActivePlace(selectedCity.places[0]);

    leafletMapContainerRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }

  function handleCarouselPlaceChange(name: string) {
    setActivePlace(activeCity.places.find((place) => place.name === name));
  }

  function handleGoBackButtonClick() {
    setActiveCity(undefined);
    setActivePlace(undefined);

    leafletMarkersRef.current.forEach((marker) => marker.closePopup());
  }

  function flyToMapBounds(markersCoordinates: L.LatLngExpression[]) {
    if (markersCoordinates.length === 0) return;

    leafletMapRef.current.flyToBounds(L.latLngBounds(markersCoordinates), {
      duration: 1,
      paddingTopLeft: [50, 50],
      paddingBottomRight: [50, 50],
    });
  }

  useEffect(function initializeLeafletMap() {
    L.Icon.Default.imagePath = '/images/leaflet/';

    leafletMapRef.current = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          `https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_MAP_API_KEY}`
        ),
      ],
    });

    cities.forEach(({ places }) => {
      places.forEach(({ name, coordinates }) => {
        const marker = L.marker(coordinates as L.LatLngExpression);
        marker.bindPopup(name);
        marker.addTo(leafletMapRef.current);

        leafletMarkersRef.current.push(marker);
      });
    });

    leafletMapRef.current.fitBounds(
      L.latLngBounds(leafletMarkersRef.current.map((marker) => marker.getLatLng())),
      {
        paddingTopLeft: [50, 50],
        paddingBottomRight: [50, 50],
      }
    );
  }, []);

  useEffect(
    function onActiveCountryAndCityChange() {
      if (!activeCountry || activeCountry.code === 'world') {
        setFilteredCities(cities);
        flyToMapBounds(leafletMarkersRef.current.map((marker) => marker.getLatLng()));
        return;
      }

      const countryCities = cities.filter(({ countryCode }) => countryCode === activeCountry.code);

      setFilteredCities(countryCities);
      flyToMapBounds(
        countryCities
          .map(({ places }) => places.map(({ coordinates }) => coordinates as L.LatLngExpression))
          .flat()
      );
    },
    [activeCountry, activeCity]
  );

  useEffect(
    function onActivePlaceChange() {
      if (!activePlace) return;

      leafletMapRef.current.flyTo(activePlace.coordinates as L.LatLngExpression, 15, {
        duration: 1,
      });

      leafletMarkersRef.current.forEach((marker) => {
        const { lat, lng } = marker.getLatLng();

        if (activePlace.coordinates[0] === lat && activePlace.coordinates[1] === lng) {
          marker.openPopup();
        } else {
          marker.closePopup();
        }
      });
    },
    [activePlace]
  );

  return (
    <StyledPageContainer>
      <TravelH1>{activeCountry.name}</TravelH1>
      <TravelCountries
        countries={countries}
        activeCountry={activeCountry}
        onCountryClick={handleCountryClick}
      />
      <MapContainerDiv id="map-container" ref={leafletMapContainerRef} />

      <AnimatePresence exitBeforeEnter>
        {!activeCity ? (
          <TravelCities
            key={activeCountry?.name || 'cities'}
            cities={filteredCities}
            onCityClick={handleCityClick}
          />
        ) : (
          <TravelCity
            key={activeCity.name}
            city={activeCity}
            place={activePlace}
            onGoBackButtonClick={handleGoBackButtonClick}
            onCarouselPlaceChange={handleCarouselPlaceChange}
          />
        )}
      </AnimatePresence>
    </StyledPageContainer>
  );
};

export default Travels;
