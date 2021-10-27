import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PortfolioItem } from '@src/components/Portfolio/PortfolioItem';
import { PortfolioModal } from '@src/components/Portfolio//PortfolioModal';

import type { FC } from 'react';
import type { IPortfolioItem } from './Portfolio.types';

const PortfolioH1 = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 3rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 5rem;
  `
);

const PortfolioGridDiv = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-gap: 5rem;
    grid-template-columns: repeat(2, 1fr);

    ${theme.breakpoints.extraSmall} {
      grid-template-columns: 1fr;
    }
  `
);

const IMAGES_BASE_URL = '/images/portfolio';

const Portfolio: FC = () => {
  const { t } = useTranslation();

  const [modalActiveItem, setModalActiveItem] = useState<number>();

  const portfolioItems = useMemo<IPortfolioItem[]>(
    () => [
      {
        name: 'Burberry',
        description: t('portfolio.items.burberry'),
        logoImage: `${IMAGES_BASE_URL}/burberry/logo.png`,
        images: [
          `${IMAGES_BASE_URL}/burberry/1.png`,
          `${IMAGES_BASE_URL}/burberry/2.png`,
          `${IMAGES_BASE_URL}/burberry/3.png`,
          `${IMAGES_BASE_URL}/burberry/4.png`,
        ],
      },
      {
        name: 'Tankey',
        description: t('portfolio.items.tankey'),
        images: [`${IMAGES_BASE_URL}/tankey/1.png`, `${IMAGES_BASE_URL}/tankey/2.png`],
        logoImage: `${IMAGES_BASE_URL}/tankey/logo.png`,
      },
      {
        name: 'Carmo',
        images: [`${IMAGES_BASE_URL}/carmo.png`],
        logoImage: 'carmo-logo.svg',
        description: '',
      },
      {
        name: 'TOConline',
        images: [`${IMAGES_BASE_URL}/toconline.png`],
        logoImage: '',
        description: '',
      },
    ],
    []
  );

  function handlePortfolioItemClick(index: number) {
    setModalActiveItem(index);
  }

  return (
    <>
      <PortfolioH1>{t('portfolio.title')}</PortfolioH1>
      <PortfolioGridDiv>
        {portfolioItems.map(({ name, images }, index) => (
          <PortfolioItem
            key={name}
            name={name}
            index={index}
            image={images[0]}
            onClick={handlePortfolioItemClick}
          />
        ))}
      </PortfolioGridDiv>

      <PortfolioModal
        item={portfolioItems[modalActiveItem]}
        open={modalActiveItem !== undefined}
        onClose={() => setModalActiveItem(undefined)}
      />
    </>
  );
};

export { Portfolio };
