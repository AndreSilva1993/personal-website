import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { MdArrowBack } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import { Button } from '@src/components/Button/Button';
import { Carousel } from '@src/components/Carousel/Carousel';

import type { FC } from 'react';
import type { TravelCityProps } from './Travels.types';

const CityWrapperDiv = styled(motion.div)`
  width: 100%;
  min-height: 42rem;
`;

const CityHeadingWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3rem 0;
`;

const CityNameH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2.5rem;
    text-transform: uppercase;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};
  `
);

const StyledCarousel = styled(Carousel)(
  ({ theme }) => css`
    height: 45rem;
    float: left;
    margin: 0 4rem 0 0;
    aspect-ratio: 4 / 3;

    ${theme.media.lteExtraSmall} {
      width: 100%;
      height: unset;
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

    ${theme.media.lteExtraSmall} {
      text-align: center;
    }
  `
);

const PlaceDescriptionP = styled.p(
  ({ theme }) => css`
    line-height: 3.5rem;
    font-size: 1.5rem;
    text-align: justify;
    color: ${theme.colors.lightGrey};
  `
);

const TravelCity: FC<TravelCityProps> = ({
  city,
  place,
  onGoBackButtonClick,
  onCarouselPlaceChange,
}) => {
  const { t } = useTranslation();
  const placesImages = city.places
    .map(({ images, name }) => images.map(({ url, landscape }) => ({ url, landscape, name })))
    .flat();

  return (
    <motion.div
      key="city"
      initial={{ opacity: 0, x: '100%' }}
      exit={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CityHeadingWrapperDiv>
        <CityNameH1>{city.name}</CityNameH1>

        <Button onClick={onGoBackButtonClick}>
          <MdArrowBack />
          {t('common.goBack')}
        </Button>
      </CityHeadingWrapperDiv>
      <CityWrapperDiv>
        <StyledCarousel
          onCarouselIndexChange={(index) => onCarouselPlaceChange(placesImages[index].name)}
        >
          {placesImages.map(({ url, landscape, name }) => (
            <Image
              priority
              src={url}
              alt={name}
              layout="fill"
              draggable={false}
              objectFit={landscape ? 'cover' : 'contain'}
            />
          ))}
        </StyledCarousel>

        <PlaceNameH1>{t(place.name)}</PlaceNameH1>
        <PlaceDescriptionP>{t(place.description)}</PlaceDescriptionP>
      </CityWrapperDiv>
    </motion.div>
  );
};

export { TravelCity };
