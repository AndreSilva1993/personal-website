import 'leaflet/dist/leaflet.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useMemo, useState } from 'react';

import { Carousel } from '@src/components/Carousel/Carousel';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';
import type { TravelCity, TravelPlace } from './Travels.types';

const StyledPageContainer = styled(PageContainer)`
  max-width: 150rem;
  margin: 0 auto;
`;

const MapContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    aspect-ratio: 16 / 7;
    margin-bottom: 1rem;

    ${theme.breakpoints.lteExtraSmall} {
      aspect-ratio: 4 / 3;
    }
  `
);

const CitiesUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const CityLi = styled.li(
  ({ theme }) => css`
    height: 46rem;
    flex: 1 0 40%;
    padding: 1rem;
    cursor: pointer;
    overflow: hidden;

    &:nth-child(4n + 1),
    &:nth-child(4n + 4) {
      flex: 1 0 60%;
    }

    &:nth-child(odd) {
      padding-left: 0;
    }

    &:nth-child(even) {
      padding-right: 0;
    }

    ${theme.breakpoints.extraSmall} {
      flex: 0 0 100%;
      height: 20rem;
      padding: 1rem 0;
    }
  `
);

const CityWrapperImage = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
`;

const CityImage = styled(Image)`
  &:hover {
    transform: scale(1.1);
    transition: transform 250ms ease-out;
  }
`;

const CityWrapperDiv = styled(motion.div)`
  width: 100%;
  min-height: 50rem;
`;

const StyledCarousel = styled(Carousel)(
  ({ theme }) => css`
    width: 50%;
    float: left;
    margin: 0 4rem 0 0;
    aspect-ratio: 4 / 3;

    ${theme.breakpoints.lteExtraSmall} {
      width: 100%;
      float: initial;
      margin: 0 0 4rem 0;
    }
  `
);

const PlaceNameH1 = styled.h1(
  ({ theme: { colors, fontWeights, breakpoints } }) => css`
    font-size: 2rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    color: ${colors.white};
    font-weight: ${fontWeights.boldest};

    ${breakpoints.lteExtraSmall} {
      text-align: center;
    }
  `
);

const PlaceDescriptionP = styled.p(
  ({ theme: { colors } }) => css`
    line-height: 3.5rem;
    font-size: 1.5rem;
    color: ${colors.lightGrey};
    text-align: justify;
  `
);

const Travels: FC = () => {
  const { t } = useTranslation();

  const leafletMapRef = useRef<L.Map>();
  const leafletMarkersRef = useRef<L.Marker[]>([]);

  const cities = useMemo<TravelCity[]>(() => travelsJSON.travels, []);

  const [activeCity, setActiveCity] = useState<TravelCity>();
  const [activePlace, setActivePlace] = useState<TravelPlace>();

  const placesWithImages = useMemo(() => {
    if (!activeCity) return undefined;

    return activeCity.places.reduce<TravelPlace[]>(
      (places, place) => (!place.image ? places : [...places, place]),
      [] as TravelPlace[]
    );
  }, [activeCity]);

  function handleCityClick(index: number) {
    setActiveCity(cities[index]);
  }

  function handleCarouselIndexChange(index: number) {
    setActivePlace(placesWithImages[index]);
  }

  useEffect(() => {
    L.Icon.Default.imagePath = '/images/leaflet/';

    leafletMapRef.current = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png')],
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

  useEffect(() => {
    if (activePlace) {
      leafletMapRef.current.flyTo(activePlace.coordinates as L.LatLngExpression, 15, {
        duration: 1,
      });

      leafletMarkersRef.current.forEach((marker) => {
        const markerCoordinates = marker.getLatLng();

        if (
          markerCoordinates.lat === activePlace.coordinates[0] &&
          markerCoordinates.lng === activePlace.coordinates[1]
        ) {
          marker.openPopup();
        } else {
          marker.closePopup();
        }
      });
    }
  }, [activePlace]);

  return (
    <StyledPageContainer>
      <MapContainer id="map-container" />

      <AnimatePresence>
        {!activeCity && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            exit={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CitiesUl>
              {cities.map((city, index) => (
                <CityLi onClick={() => handleCityClick(index)}>
                  <CityWrapperImage>
                    <CityImage
                      alt={city.name}
                      title={city.name}
                      src={city.image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </CityWrapperImage>
                </CityLi>
              ))}
            </CitiesUl>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCity && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            exit={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CityWrapperDiv key={activeCity.name}>
              <button type="button" onClick={() => setActiveCity(undefined)}>
                teste
              </button>
              <StyledCarousel onCarouselIndexChange={handleCarouselIndexChange}>
                {placesWithImages.map(({ image: { url, landscape }, name }) => (
                  <Image
                    src={url}
                    alt={name}
                    layout="fill"
                    draggable={false}
                    objectFit={landscape ? 'cover' : 'contain'}
                  />
                ))}
              </StyledCarousel>

              {activePlace && (
                <>
                  <PlaceNameH1>{activePlace.name}</PlaceNameH1>
                  <PlaceDescriptionP>{t(activePlace.description)}</PlaceDescriptionP>
                </>
              )}
            </CityWrapperDiv>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledPageContainer>
  );
};

export default Travels;
