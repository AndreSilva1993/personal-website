import 'leaflet/dist/leaflet.css';

import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useMemo } from 'react';
import { renderToString } from 'react-dom/server';

import type { FC } from 'react';
import type { Map, LatLngExpression } from 'leaflet';
import { LeafletPopup } from './LeafletPopup';

const TravelsH1 = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 3rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 5rem;
  `
);

const MapContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const FlagsWrapperDiv = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
`;

const FlagWrapperDiv = styled.li`
  height: 4rem;
  cursor: pointer;
  position: relative;
  aspect-ratio: 4 / 3;

  &:not(:last-of-type) {
    margin-right: 3rem;
  }
`;

L.Icon.Default.imagePath = '/images/leaflet/';

const Travels: FC = () => {
  const { t } = useTranslation();
  const leafletMapRef = useRef<Map>();

  const visitedCountries = useMemo(() => travelsJSON.travels, []);

  useEffect(() => {
    leafletMapRef.current = L.map('map-container', {
      layers: [
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
        ),
      ],
    });

    const markersCoordinates: LatLngExpression[] = [];

    visitedCountries.forEach(({ cities }) => {
      cities.forEach(({ places }) => {
        places.forEach(({ name, image, coordinates }) => {
          markersCoordinates.push(coordinates as LatLngExpression);
          const marker = L.marker(coordinates as LatLngExpression, {
            title: name,
          });

          if (!image) {
            marker.bindPopup(name);
          } else {
            marker.bindPopup(
              renderToString(<LeafletPopup image={image} name={name} />)
            );
          }
          marker.addTo(leafletMapRef.current);
        });
      });
    });

    leafletMapRef.current.fitBounds(L.latLngBounds(markersCoordinates), {
      paddingTopLeft: [10, 10],
      paddingBottomRight: [10, 10],
    });
  }, []);

  function handleFlagClick(index: number) {
    const mapBounds = L.latLngBounds(
      visitedCountries[index].cities
        .map(({ places }) => places.map(({ coordinates }) => coordinates))
        .flat() as LatLngExpression[]
    );
    leafletMapRef.current.fitBounds(mapBounds, { maxZoom: 10 });
  }

  return (
    <>
      <TravelsH1>{t('travels.title')}</TravelsH1>
      <MapContainer id="map-container" />

      <FlagsWrapperDiv>
        {visitedCountries.map(({ name, image }, index) => (
          <FlagWrapperDiv onClick={() => handleFlagClick(index)}>
            <Image layout="fill" src={image} alt={name} />
          </FlagWrapperDiv>
        ))}
      </FlagsWrapperDiv>
    </>
  );
};

export default Travels;
