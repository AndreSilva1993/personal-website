import 'leaflet/dist/leaflet.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useMemo, useState } from 'react';

import { Carousel } from '@src/components/Carousel/Carousel';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';
import type { Map, LatLngExpression } from 'leaflet';
import type { TravelCity, TravelCountry, TravelPlace } from './Travels.types';
import { TravelsFlags } from './TravelsFlags';

const MapContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 7;
`;

const StyledCarousel = styled(Carousel)`
  width: 50%;
  flex-shrink: 0;
  position: relative;
  aspect-ratio: 4 / 3;
`;

L.Icon.Default.imagePath = '/images/leaflet/';

const Travels: FC = () => {
  const { t } = useTranslation();
  const leafletMapRef = useRef<Map>();
  const [activeCity, setActiveCity] = useState<TravelCity>();
  const [activePlace, setActivePlace] = useState<TravelPlace>();
  const [activeCountry, setActiveCountry] = useState<TravelCountry>();

  const countries = useMemo(() => travelsJSON.travels, []);
  const flags = useMemo(
    () =>
      countries.map(({ name, flagImage }) => ({
        name,
        image: flagImage,
        active: activeCountry?.name === name,
      })),
    [activeCountry]
  );

  const placesWithImages = useMemo(() => {
    if (!activeCity) return undefined;

    return activeCity.places.reduce<TravelPlace[]>(
      (places, place) => (!place.image ? places : [...places, place]),
      [] as TravelPlace[]
    );
  }, [activeCity]);

  function fitMapBounds(markers: L.LatLngExpression[], maxZoom = 10) {
    leafletMapRef.current.fitBounds(L.latLngBounds(markers), {
      maxZoom,
      paddingTopLeft: [10, 10],
      paddingBottomRight: [10, 10],
    });
  }

  function handleFlagClick(index: number) {
    const country = countries[index];
    setActiveCountry(countries[index]);

    if (country.cities.length === 1) {
      setActiveCity(country.cities[0]);
    } else {
      const markers = country.cities
        .map(({ places }) => places.map(({ coordinates }) => coordinates))
        .flat() as LatLngExpression[];

      fitMapBounds(markers);
      setActiveCity(undefined);
    }
  }

  function handleCarouselIndexChange(index: number) {
    setActivePlace(placesWithImages[index]);
  }

  useEffect(() => {
    leafletMapRef.current = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
        ),
      ],
    });

    const markersCoordinates: LatLngExpression[] = [];

    countries.forEach(({ cities }) => {
      cities.forEach(({ places }) => {
        places.forEach(({ name, coordinates }) => {
          markersCoordinates.push(coordinates as LatLngExpression);
          const marker = L.marker(coordinates as LatLngExpression, {
            title: name,
          });

          marker.bindPopup(name);
          marker.addTo(leafletMapRef.current);
        });
      });
    });

    fitMapBounds(markersCoordinates);
  }, []);

  useEffect(() => {
    if (activePlace) {
      fitMapBounds([activePlace.coordinates as LatLngExpression], 15);
    }
  }, [activePlace]);

  return (
    <PageContainer>
      <MapContainer id="map-container" />

      <TravelsFlags flags={flags} onFlagClick={handleFlagClick} />

      {activeCity ? (
        <div style={{ width: '100%', display: 'flex' }}>
          <StyledCarousel onCarouselIndexChange={handleCarouselIndexChange}>
            {placesWithImages.map((place) => (
              <Image src={place.image} layout="fill" objectFit="cover" />
            ))}
          </StyledCarousel>
          {activePlace ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 4rem',
              }}
            >
              <h1
                style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '2rem',
                }}
              >
                {activePlace.name}
              </h1>
              <p
                style={{
                  lineHeight: '3rem',
                  fontSize: '1.5rem',
                  color: '#BBB',
                  textAlign: 'justify',
                }}
              >
                {t(activePlace.description)}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </PageContainer>
  );
};

export default Travels;
