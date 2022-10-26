import styles from './TravelCountries.module.css';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

interface TravelCountriesProps {
  countries: string[];
  selectedCountries: string[];
}

const TravelCountries: FC<TravelCountriesProps> = ({ countries, selectedCountries }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <li className={styles.country} key={country}>
          <Image
            fill
            className={styles.countryImage}
            alt={t(`travels.countries.${country}`)}
            src={`/images/travels/flags/${country}.svg`}
          />
          {selectedCountries.includes(country) && <div className={styles.countryBorder} />}
        </li>
      ))}
    </ul>
  );
};

export { TravelCountries };
