import styles from './PortfolioModal.module.css';

import Image from 'next/image';

import { Modal } from '@src/components/Modal/Modal';
import { Carousel } from '@src/components/Carousel/Carousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

const PortfolioModal: FC<PortfolioModalProps> = ({ item, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <div className={styles.modalWrapper}>
      <Carousel className={styles.carousel}>
        {item?.images.map((image, index) => (
          <Image
            priority
            src={image}
            key={index}
            alt={item?.name}
            sizes="50vw"
            layout="fill"
            objectFit="cover"
          />
        ))}
      </Carousel>
      <h1 className={styles.title}>{item?.name}</h1>
      <p className={styles.description}>{item?.description}</p>
    </div>
  </Modal>
);

export { PortfolioModal };
