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

const Portfolio: FC = () => {
  const { t } = useTranslation();

  const [modalActiveItem, setModalActiveItem] = useState<number>();

  const portfolioItems = useMemo<IPortfolioItem[]>(
    () => [
      {
        name: 'Burberry',
        description: t('portfolio.items.burberry'),
        logoImage: '/images/portfolio/burberry/logo.png',
        image: '/images/portfolio/burberry/1.png',
        images: [
          '/images/portfolio/burberry/1.png',
          '/images/portfolio/burberry/2.png',
          '/images/portfolio/burberry/3.png',
          '/images/portfolio/burberry/4.png',
        ],
      },
      {
        name: 'Tankey',
        description: t('portfolio.items.tankey'),
        image: '/images/portfolio/tankey/1.png',
        images: ['/images/portfolio/tankey/1.png', '/images/portfolio/tankey/2.png'],
        logoImage: '/images/portfolio/tankey/logo.png',
      },
      {
        name: 'Carmo',
        image: '/images/portfolio/carmo.png',
        logoImage: 'carmo-logo.svg',
        description: '',
      },
      {
        name: 'TOConline',
        image: '/images/portfolio/toconline.png',
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
        {portfolioItems.map(({ name, image }, index) => (
          <PortfolioItem
            key={name}
            name={name}
            image={image}
            index={index}
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
