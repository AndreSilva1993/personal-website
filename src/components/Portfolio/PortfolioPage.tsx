'use client';

import styles from './PortfolioPage.module.css';

import CarmoImage from '@public/images/portfolio/carmo/1.webp';
import DockerImage from '@public/images/portfolio/docker/1.png';
import TankeyImage from '@public/images/portfolio/tankey/1.webp';
import BurberryImage from '@public/images/portfolio/burberry/1.webp';
import ToconlineImage from '@public/images/portfolio/toconline/1.webp';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PortfolioItem } from '@src/components/Portfolio/PortfolioItem';
import { PortfolioModal } from '@src/components/Portfolio/PortfolioModal';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { IPortfolioItem } from './Portfolio.types';

const IMAGES_BASE_URL = '/images/portfolio';

export function PortfolioPage() {
  const { t } = useTranslation();

  const [modalActiveItem, setModalActiveItem] = useState<number>();

  const portfolioItems = useMemo<IPortfolioItem[]>(
    () => [
      {
        name: 'Docker',
        description: t('portfolio.items.docker'),
        logoImage: `${IMAGES_BASE_URL}/docker/logo.svg`,
        mainImage: DockerImage,
        images: [
          `${IMAGES_BASE_URL}/docker/2.png`,
          `${IMAGES_BASE_URL}/docker/3.png`,
          `${IMAGES_BASE_URL}/docker/4.png`,
          `${IMAGES_BASE_URL}/docker/5.png`,
        ],
      },
      {
        name: 'Burberry',
        description: t('portfolio.items.burberry'),
        logoImage: `${IMAGES_BASE_URL}/burberry/logo.svg`,
        mainImage: BurberryImage,
        images: [
          `${IMAGES_BASE_URL}/burberry/1.webp`,
          `${IMAGES_BASE_URL}/burberry/2.webp`,
          `${IMAGES_BASE_URL}/burberry/3.webp`,
          `${IMAGES_BASE_URL}/burberry/4.webp`,
          `${IMAGES_BASE_URL}/burberry/5.webp`,
        ],
      },
      {
        name: 'Tankey',
        description: t('portfolio.items.tankey'),
        logoImage: `${IMAGES_BASE_URL}/tankey/logo.webp`,
        mainImage: TankeyImage,
        images: [`${IMAGES_BASE_URL}/tankey/1.webp`, `${IMAGES_BASE_URL}/tankey/2.webp`],
      },
      {
        name: 'Carmo',
        logoImage: `${IMAGES_BASE_URL}/carmo/logo.svg`,
        mainImage: CarmoImage,
        images: [
          `${IMAGES_BASE_URL}/carmo/1.webp`,
          `${IMAGES_BASE_URL}/carmo/2.webp`,
          `${IMAGES_BASE_URL}/carmo/3.webp`,
        ],
        description: t('portfolio.items.carmo'),
      },
      {
        name: 'TOConline',
        logoImage: `${IMAGES_BASE_URL}/toconline/logo.webp`,
        mainImage: ToconlineImage,
        images: [`${IMAGES_BASE_URL}/toconline/1.webp`, `${IMAGES_BASE_URL}/toconline/2.webp`],
        description: t('portfolio.items.toconline'),
      },
    ],
    []
  );

  function handlePortfolioItemClick(index: number) {
    setModalActiveItem(index);
  }

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{t('portfolio.title')}</h1>
      <div className={styles.gridWrapper}>
        {portfolioItems.map(({ name, mainImage, logoImage }, index) => (
          <PortfolioItem
            key={name}
            name={name}
            index={index}
            image={mainImage}
            logoImage={logoImage}
            onClick={handlePortfolioItemClick}
          />
        ))}
      </div>

      <PortfolioModal
        item={modalActiveItem ? portfolioItems[modalActiveItem] : undefined}
        open={modalActiveItem !== undefined}
        onClose={() => setModalActiveItem(undefined)}
      />
    </PageContainer>
  );
}
