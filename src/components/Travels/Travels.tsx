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
    height: 46rem;
    width: 100%;
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

const CityImage = styled(Image)`
  transition: transform 300ms ease;
`;

const CityLi = styled.li(
  ({ theme }) => css`
    height: 46rem;
    flex: 0 0 40%;
    padding: 1rem;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &:nth-child(4n + 1),
    &:nth-child(4n + 4) {
      flex: 0 0 60%;
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

    &:hover {
      ${CityImage} {
        transform: scale(1.1);
      }
    }
  `
);

const CityImageWrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
`;

const CityNameSpan = styled.span(
  ({ theme }) => css`
    color: white;
    font-size: 2.5rem;
    text-transform: uppercase;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.fontWeights.boldest};

    &::after {
      content: '';
      width: 5rem;
      height: 0.2rem;
      margin-top: 1.5rem;
      background-color: ${theme.colors.white};
      transition: transform 300ms ease;
    }

    &:hover {
      &::after {
        transform: scaleX(1.5);
      }
    }
  `
);

const CityWrapperDiv = styled(motion.div)`
  width: 100%;
  min-height: 40rem;
`;

const StyledCarousel = styled(Carousel)(
  ({ theme }) => css`
    height: 40rem;
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
  ({ theme }) => css`
    font-size: 2rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};

    ${theme.breakpoints.lteExtraSmall} {
      text-align: center;
    }
  `
);

const PlaceDescriptionP = styled.p(
  ({ theme }) => css`
    line-height: 3.5rem;
    font-size: 1.5rem;
    color: ${theme.colors.lightGrey};
    text-align: justify;
  `
);

const Travels: FC = () => {
  const { t } = useTranslation();

  const leafletMapRef = useRef<L.Map>();
  const leafletMarkersRef = useRef<L.Marker[]>([]);
  const leafletMapContainerRef = useRef<HTMLDivElement>();

  const cities = useMemo<TravelCity[]>(() => travelsJSON.travels, []);

  const [activeCity, setActiveCity] = useState<TravelCity>();
  const [activePlace, setActivePlace] = useState<TravelPlace>();

  function handleCityClick(index: number) {
    leafletMapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveCity(cities[index]);
    setActivePlace(cities[index].places[0]);
  }

  function handleCarouselIndexChange(index: number) {
    setActivePlace(activeCity.places[index]);
  }

  useEffect(function initializeLeafletMap() {
    L.Icon.Default.imagePath = '/images/leaflet/';

    leafletMapRef.current = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=4073a40b-4434-4dad-87f7-a9725a39a875'
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
    function flyToActivePlace() {
      if (!activePlace) return;

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
    },
    [activePlace]
  );

  useEffect(
    function flyToMapBounds() {
      if (activeCity) return;

      leafletMapRef.current.flyToBounds(
        L.latLngBounds(leafletMarkersRef.current.map((marker) => marker.getLatLng())),
        {
          duration: 1,
          paddingTopLeft: [50, 50],
          paddingBottomRight: [50, 50],
        }
      );
    },
    [activeCity]
  );

  return (
    <StyledPageContainer>
      <MapContainer id="map-container" ref={leafletMapContainerRef} />

      <AnimatePresence exitBeforeEnter>
        {!activeCity && (
          <motion.div
            key="cities"
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            initial={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5 }}
          >
            <CitiesUl>
              {cities.map((city, index) => (
                <CityLi onClick={() => handleCityClick(index)}>
                  <CityImageWrapperDiv>
                    <CityImage
                      alt={city.name}
                      title={city.name}
                      src={city.image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </CityImageWrapperDiv>
                  <CityNameSpan>{city.name}</CityNameSpan>
                </CityLi>
              ))}
            </CitiesUl>
          </motion.div>
        )}

        {activeCity && (
          <motion.div
            key="city"
            initial={{ opacity: 0, x: '100%' }}
            exit={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                margin: '3rem 0',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <h1
                style={{
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {activeCity.name}
              </h1>

              <div>
                <button
                  style={{
                    outline: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: 'white',
                    border: '1px solid white',
                    height: '3.6rem',
                    padding: '0 1.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                  type="button"
                  onClick={() => setActiveCity(undefined)}
                >
                  Go back
                </button>
              </div>
            </div>
            <CityWrapperDiv>
              <StyledCarousel onCarouselIndexChange={handleCarouselIndexChange}>
                {activeCity.places.map(({ image: { url, landscape }, name }) => (
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
              <div style={{ clear: 'both' }} />
            </CityWrapperDiv>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledPageContainer>
  );
};

export default Travels;
