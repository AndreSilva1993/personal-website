import styles from './TravelsList.module.css';

import Image from 'next/image';
import { motion } from 'framer-motion';

import type { FC } from 'react';
import type { ITravel } from './Travels.types';

interface TravelListItemProps {
  travels: ITravel[];
  onTravelClick: (index: number) => void;
}

export const TravelsList: FC<TravelListItemProps> = ({ travels, onTravelClick }) => (
  <motion.div
    transition={{ duration: 0.5 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100%' }}
    initial={{ opacity: 0, x: '-100%' }}
  >
    <ul className={styles.citiesList}>
      {travels.map(({ name, image }, index) => (
        <li className={styles.city} key={name} onClick={() => onTravelClick(index)}>
          <div className={styles.cityImageWrapper}>
            <Image
              src={image}
              alt={name}
              title={name}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={index < 2}
              className={styles.cityImage}
            />
          </div>
          <span className={styles.cityName}>{name}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);
