import styles from './TravelCountries.module.css';

import Image from 'next/image';
import { motion } from 'framer-motion';

import type { FC } from 'react';
import type { TravelCountriesProps } from './Travels.types';

const TravelCountries: FC<TravelCountriesProps> = ({
  countries,
  activeCountry = {},
  onCountryClick,
}) => {
  function handleCountryClick(index: number) {
    onCountryClick(index);
  }

  return (
    <ul className={styles.countriesList}>
      {countries.map(({ name, image, code }, index) => (
        <li className={styles.country} key={name} onClick={() => handleCountryClick(index)}>
          <Image className={styles.countryImage} alt={name} src={image} layout="fill" />
          {activeCountry.code === code && (
            <motion.div className={styles.countryBorder} initial={false} layoutId="underline" />
          )}
        </li>
      ))}
    </ul>
  );
};

export { TravelCountries };
