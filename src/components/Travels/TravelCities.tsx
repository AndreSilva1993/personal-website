import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import type { FC } from 'react';
import type { TravelCitiesProps } from './Travels.types';

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
    flex: 1 0 40%;
    padding: 1rem;
    cursor: pointer;
    overflow: hidden;
    position: relative;

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

const TravelCities: FC<TravelCitiesProps> = ({ cities, onCityClick }) => (
  <motion.div
    transition={{ duration: 0.5 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100%' }}
    initial={{ opacity: 0, x: '-100%' }}
  >
    <CitiesUl>
      {cities.map((city, index) => (
        <CityLi onClick={() => onCityClick(index)}>
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
);

export { TravelCities };
