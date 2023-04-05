'use client';

import 'leaflet/dist/leaflet.css';
import styles from './TravelsPage.module.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useMemo, useState } from 'react';

import type { FC } from 'react';
import type { ITravel } from './Travels.types';

import { TravelItem } from '@src/components/Travels/TravelItem';
import { TravelsList } from '@src/components/Travels/TravelsList';
import { TravelCountries } from '@src/components/Travels/TravelCountries';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

interface TravelsPageProps {
  initialSelectedTravel?: string;
}

export const TravelsPage: FC<TravelsPageProps> = ({ initialSelectedTravel }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const leafletMarkersLayerGroup = useRef<L.LayerGroup>();
  const leafletMapContainerRef = useRef<HTMLDivElement | null>(null);

  const travels = useMemo<ITravel[]>(() => travelsJSON.travels, []);
  const countries = useMemo<string[]>(() => travelsJSON.countries, []);

  const [leafletMap, setLeafletMap] = useState<L.Map>();
  const [selectedTravel, setSelectedTravel] = useState<ITravel | undefined>(() => {
    return travelsJSON.travels.find(({ slug }) => slug === initialSelectedTravel);
  });

  function handleTravelClick(index: number) {
    setSelectedTravel(travels[index]);
    leafletMapContainerRef.current!.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
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

    const newLeafletMap = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          `https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_MAP_API_KEY}`
        ),
      ],
    });

    newLeafletMap.fitBounds(L.latLngBounds(getPlacesCoordinates()));
    setLeafletMap(newLeafletMap);

    return () => {
      newLeafletMap.remove();
    };
  }, []);

  useEffect(
    function onSelectedTravelChange() {
      if (!leafletMap) return;

      router.replace(!selectedTravel ? '/travels' : `/travels?travel=${selectedTravel.slug}`);

      const markersCoordinates = getPlacesCoordinates(selectedTravel);
      leafletMap.flyToBounds(L.latLngBounds(markersCoordinates), {
        duration: 1,
        paddingTopLeft: [25, 25],
        paddingBottomRight: [25, 25],
      });

      if (leafletMarkersLayerGroup.current) {
        leafletMarkersLayerGroup.current.clearLayers();
      }

      leafletMarkersLayerGroup.current = L.layerGroup(
        getPlacesCoordinates(selectedTravel).map((coordinates) => L.marker(coordinates))
      ).addTo(leafletMap);
    },
    [leafletMap, selectedTravel]
  );

  const selectedCountries = selectedTravel?.countryCodes || [];

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{!selectedTravel ? t('travels.title') : selectedTravel.name}</h1>
      <TravelCountries countries={countries} selectedCountries={selectedCountries} />
      <div className={styles.mapContainer} id="map-container" ref={leafletMapContainerRef} />

      <AnimatePresence mode="wait">
        {!selectedTravel ? (
          <TravelsList travels={travels} onTravelClick={handleTravelClick} />
        ) : (
          <TravelItem
            key={selectedTravel.name}
            travel={selectedTravel}
            onGoBackButtonClick={() => setSelectedTravel(undefined)}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
