import styles from './TravelItem.module.css';

import Image from 'next/image';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import { Masonry, MasonryItem } from '@src/components/Masonry/Masonry';

import type { ITravel } from './Travels.types';

interface TravelItemProps {
  travel: ITravel;
  onGoBackButtonClick: () => void;
}

export function TravelItem({ travel, onGoBackButtonClick }: TravelItemProps) {
  const { t } = useTranslation();
  const placesImages = travel.places
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
      <div className={styles.travelHeadingWrapper}>
        <h1 className={styles.travelName}>{travel.name}</h1>

        <Button variant="outlined" onClick={onGoBackButtonClick}>
          {t('common.goBack')}
        </Button>
      </div>
      <Masonry numberOfColumns={3}>
        {placesImages.map(({ url, landscape, name }, index) => (
          <MasonryItem landscape={landscape} key={index}>
            <div
              className={classNames(styles.imageWrapper, {
                [styles.imageLandscapeWrapper]: landscape,
              })}
            >
              <Image src={url} alt={name} layout="fill" draggable={false} objectFit="cover" />
              <p className={styles.imageTitle}>{t(name)}</p>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    </motion.div>
  );
}