import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import type { FC } from 'react';
import type { TravelCountriesProps } from './Travels.types';

const CountriesUl = styled.ul(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 1.5rem;
    margin: 2rem 0;
    color: ${theme.colors.white};
    justify-content: center;
  `
);

const CountryLi = styled.li(
  ({ theme: { media } }) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin: 1rem;

    width: 5rem;
    height: 5rem;

    ${media.extraSmall} {
      height: 3rem;
      width: 3rem;
    }
  `
);

const CountryLiBorder = styled(motion.div)`
  top: -1rem;
  left: -1rem;
  position: absolute;
  width: calc(100% + 2rem);
  height: calc(100% + 2rem);
  border: 2px solid white;
  border-radius: 50%;
`;

const CountryImage = styled(Image)(
  ({ theme }) => css`
    height: 5rem;

    ${theme.media.extraSmall} {
      height: 3rem;
    }
  `
);

const TravelCountries: FC<TravelCountriesProps> = ({
  countries,
  activeCountry = {},
  onCountryClick,
}) => {
  function handleCountryClick(index: number) {
    onCountryClick(index);
  }

  return (
    <AnimateSharedLayout>
      <CountriesUl>
        {countries.map(({ name, image, code }, index) => (
          <CountryLi key={name} onClick={() => handleCountryClick(index)}>
            <CountryImage alt={name} src={image} layout="fill" />
            {activeCountry.code === code && (
              <CountryLiBorder initial={false} layoutId="underline" />
            )}
          </CountryLi>
        ))}
      </CountriesUl>
    </AnimateSharedLayout>
  );
};

export { TravelCountries };
