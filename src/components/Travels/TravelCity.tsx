import styles from './TravelCity.module.css';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import { Carousel } from '@src/components/Carousel/Carousel';

import type { FC } from 'react';
import type { TravelCityProps } from './Travels.types';

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
      <div className={styles.cityHeadingWrapper}>
        <h1 className={styles.cityName}>{city.name}</h1>

        <Button variant="outlined" onClick={onGoBackButtonClick}>
          {t('common.goBack')}
        </Button>
      </div>
      <div className={styles.cityWrapper}>
        <Carousel
          className={styles.carousel}
          onCarouselIndexChange={(index) => onCarouselPlaceChange(placesImages[index].name)}
        >
          {placesImages.map(({ url, landscape, name }, index) => (
            <Image
              key={index}
              src={url}
              alt={name}
              layout="fill"
              draggable={false}
              objectFit={landscape ? 'cover' : 'contain'}
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          ))}
        </Carousel>

        <h1 className={styles.placeName}>{t(place.name)}</h1>
        <p className={styles.placeDescription}>{t(place.description)}</p>
      </div>
    </motion.div>
  );
};

export { TravelCity };
