import 'leaflet/dist/leaflet.css';
import travelsJSON from '@public/travels.json';

import L from 'leaflet';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useMemo, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

import { Carousel } from '@src/components/Carousel/Carousel';
import { TravelsFlags } from '@src/components/Travels/TravelsFlags';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';
import type { TravelCity, TravelCountry, TravelPlace } from './Travels.types';

const MapContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    aspect-ratio: 16 / 7;

    ${theme.breakpoints.lteExtraSmall} {
      aspect-ratio: 4 / 3;
    }
  `
);

const CityTabsUl = styled.ul`
  display: flex;
  margin-bottom: 4rem;
  position: relative;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grey};
`;

const CityTabLi = styled.li(
  ({ theme }) => css`
    flex-grow: 1;
    max-width: 20rem;
    text-align: center;
    font-size: 1.5rem;
    padding: 2rem;
    cursor: pointer;
    color: ${theme.colors.white};

    ${theme.breakpoints.extraSmall} {
      max-width: unset;
    }
  `
);

const CityUnderlineTabDiv = styled(motion.div)<{ underlineWidth: number }>(
  ({ theme, underlineWidth }) => css`
    height: 0.2rem;
    width: 20rem;
    left: 0;
    bottom: 0;
    position: absolute;
    background-color: ${theme.colors.white};

    ${theme.breakpoints.extraSmall} {
      width: ${underlineWidth}%;
    }
  `
);

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
  const underlineControls = useAnimation();

  const leafletMapRef = useRef<L.Map>();
  const leafletMarkersRef = useRef<L.Marker[]>([]);

  const countries = useMemo<TravelCountry[]>(() => travelsJSON.travels, []);

  const [activeCountry, setActiveCountry] = useState<TravelCountry>();
  const [activeCity, setActiveCity] = useState<TravelCity>();
  const [activePlace, setActivePlace] = useState<TravelPlace>();

  const placesWithImages = useMemo(() => {
    if (!activeCity) return undefined;

    return activeCity.places.reduce<TravelPlace[]>(
      (places, place) => (!place.image ? places : [...places, place]),
      [] as TravelPlace[]
    );
  }, [activeCity]);

  const flags = useMemo(
    () =>
      countries.map(({ name, flagImage }) => ({
        name,
        image: flagImage,
        active: activeCountry?.name === name,
      })),
    [activeCountry]
  );

  function handleFlagClick(index: number) {
    setActiveCountry(countries[index]);
    setActiveCity(countries[index].cities[0]);

    underlineControls.start({ x: 0 });
  }

  function handleCityClick(index: number) {
    setActiveCity(activeCountry.cities[index]);

    underlineControls.start({ x: `${100 * index}%` });
  }

  function handleCarouselIndexChange(index: number) {
    setActivePlace(placesWithImages[index]);
  }

  useEffect(() => {
    L.Icon.Default.imagePath = '/images/leaflet/';

    leafletMapRef.current = L.map('map-container', {
      layers: [L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png')],
    });

    countries.forEach(({ cities }) => {
      cities.forEach(({ places }) => {
        places.forEach(({ name, coordinates }) => {
          const marker = L.marker(coordinates as L.LatLngExpression);
          marker.bindPopup(name);
          marker.addTo(leafletMapRef.current);

          leafletMarkersRef.current.push(marker);
        });
      });
    });

    leafletMapRef.current.fitBounds(
      L.latLngBounds(leafletMarkersRef.current.map((marker) => marker.getLatLng())),
      {
        paddingTopLeft: [10, 10],
        paddingBottomRight: [10, 10],
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
    <PageContainer>
      <MapContainer id="map-container" />

      <TravelsFlags flags={flags} onFlagClick={handleFlagClick} />

      {activeCountry && (
        <CityTabsUl>
          <CityUnderlineTabDiv
            animate={underlineControls}
            underlineWidth={100 / activeCountry.cities.length}
          />

          {activeCountry.cities.map((city, index) => (
            <CityTabLi key={city.name} onClick={() => handleCityClick(index)}>
              {city.name}
            </CityTabLi>
          ))}
        </CityTabsUl>
      )}

      <AnimatePresence exitBeforeEnter>
        {activeCity && (
          <CityWrapperDiv
            key={activeCity.name}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
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
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Travels;
