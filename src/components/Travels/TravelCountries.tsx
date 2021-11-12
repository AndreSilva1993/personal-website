import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import type { FC } from 'react';
import type { TravelCountriesProps } from './Travels.types';

const CountriesUl = styled.ul(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    margin: 2rem 0;
    color: ${theme.colors.white};
    justify-content: center;
  `
);

const CountryLi = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 4rem;
  }
`;

const CountryLiBorder = styled(motion.div)`
  position: absolute;
  height: calc(100% + 2rem);
  border: 2px solid white;
  width: calc(100% + 2rem);
  border-radius: 50%;
  top: -1rem;
  left: -1rem;
`;

const CountryImg = styled.img`
  height: 5rem;
`;

const TravelCountries: FC<TravelCountriesProps> = ({
  countries,
  activeCountry = {},
  onCountryClick,
}) => {
  function handleCountryClick(index: number, countryCode: string) {
    if (activeCountry.code === countryCode) {
      onCountryClick();
    } else {
      onCountryClick(index);
    }
  }

  return (
    <AnimateSharedLayout>
      <CountriesUl>
        {countries.map(({ name, code }, index) => (
          <CountryLi onClick={() => handleCountryClick(index, code)}>
            <CountryImg alt={name} src={`/images/travels/flags/${code}.svg`} />
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
