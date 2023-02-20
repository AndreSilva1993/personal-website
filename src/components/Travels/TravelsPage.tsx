'use client';

import 'leaflet/dist/leaflet.css';
import styles from './TravelsPage.module.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useMemo, useState } from 'react';

import type { FC } from 'react';
import type { ITravel } from './Travels.types';

import { useTranslation } from '@src/i18n/i18n-client';
import { TravelItem } from '@src/components/Travels/TravelItem';
import { TravelsList } from '@src/components/Travels/TravelsList';
import { TravelCountries } from '@src/components/Travels/TravelCountries';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

export const TravelsPage: FC = () => {
  const { t } = useTranslation();

  const leafletMapRef = useRef<L.Map>();
  const leafletMarkersLayerGroup = useRef<L.LayerGroup>();
  const leafletMapContainerRef = useRef<HTMLDivElement>();

  const travels = useMemo<ITravel[]>(() => travelsJSON.travels, []);
  const countries = useMemo<string[]>(() => travelsJSON.countries, []);

  const [selectedTravel, setSelectedTravel] = useState<ITravel>();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  function handleTravelClick(index: number) {
    const selectedTravel = travels[index];

    setSelectedTravel(selectedTravel);
    setSelectedCountries(selectedTravel.countryCodes);

    leafletMapContainerRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }

  function handleGoBackButtonClick() {
    setSelectedTravel(undefined);
    setSelectedCountries([]);
  }

  function flyToMapBounds(markersCoordinates: L.LatLngExpression[]) {
    if (markersCoordinates.length === 0) return;

    leafletMapRef.current.flyToBounds(L.latLngBounds(markersCoordinates), {
      duration: 1,
      paddingTopLeft: [25, 25],
      paddingBottomRight: [25, 25],
    });
  }

  function getPlacesCoordinates(travel?: ITravel): L.LatLngExpression[] {
    return travel
      ? travel.places.map(({ coordinates }) => coordinates as L.LatLngExpression)
      : travels
          .map(({ places }) => places.map(({ coordinates }) => coordinates as L.LatLngExpression))
          .flat();
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

    leafletMapRef.current.fitBounds(L.latLngBounds(getPlacesCoordinates()));

    return () => {
      leafletMapRef.current.remove();
    };
  }, []);

  useEffect(
    function onSelectedTravelChange() {
      flyToMapBounds(getPlacesCoordinates(selectedTravel));

      if (leafletMarkersLayerGroup.current) {
        leafletMarkersLayerGroup.current.clearLayers();
      }

      leafletMarkersLayerGroup.current = L.layerGroup(
        getPlacesCoordinates(selectedTravel).map((coordinates) => L.marker(coordinates))
      ).addTo(leafletMapRef.current);
    },
    [selectedTravel]
  );

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{!selectedTravel ? t('travels.title') : selectedTravel.name}</h1>
      <TravelCountries countries={countries} selectedCountries={selectedCountries} />
      <div className={styles.mapContainer} id="map-container" ref={leafletMapContainerRef} />

      <AnimatePresence mode="wait">
        {!selectedTravel ? (
          <TravelsList
            travels={travels}
            onTravelClick={handleTravelClick}
            key={selectedCountries.join(',')}
          />
        ) : (
          <TravelItem
            key={selectedTravel.name}
            travel={selectedTravel}
            onGoBackButtonClick={handleGoBackButtonClick}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
