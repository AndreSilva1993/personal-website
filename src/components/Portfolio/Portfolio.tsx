import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@src/components/Modal/Modal';
import { PortfolioItem } from '@src/components/Portfolio/PortfolioItem';

import type { FC } from 'react';

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

const PortfolioModalP = styled.p`
  font-size: 1.5rem;
`;

const Portfolio: FC = () => {
  const { t } = useTranslation();

  const [modalActiveItem, setModalActiveItem] = useState<number>();

  const portfolioItems = useMemo(
    () => [
      { name: 'Burberry', image: 'burberry.png', logoImage: 'burberry-logo.png' },
      { name: 'Carmo', image: 'carmo.png', logoImage: 'carmo-logo.svg' },
      { name: 'Tankey', image: 'tankey.png', logoImage: 'tankey-logo.png' },
      { name: 'TOConline', image: 'toconline.png' },
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

      <Modal open={modalActiveItem !== undefined} onClose={() => setModalActiveItem(undefined)}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              flex: '0 0 60%',
              height: '100%',
              position: 'relative',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(/images/portfolio/${portfolioItems[modalActiveItem]?.image})`,
            }}
          >
            <ul
              style={{
                display: 'flex',
                width: '100%',
                position: 'absolute',
                bottom: '1.5rem',
                justifyContent: 'center',
              }}
            >
              <li
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  marginRight: '1.5rem',
                }}
              />
              <li
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  marginRight: '1.5rem',
                }}
              />
              <li
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  marginRight: '1.5rem',
                }}
              />
              <li
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                }}
              />
            </ul>
          </div>
          <div
            style={{
              padding: '4rem',
              display: 'flex',
              textAlign: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <img
              src={`/images/portfolio/${portfolioItems[modalActiveItem]?.logoImage}`}
              style={{ width: '100%' }}
              alt="teste"
            />
            <PortfolioModalP>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using Content here, content
              here, making it look like readable English. Many desktop publishing packages and web
              page editors now use Lorem Ipsum as their default model text, and a search for lorem
              ipsum will uncover many web sites still in their infancy. Various versions have
              evolved over the years, sometimes by accident, sometimes on purpose (injected humour
              and the like).
            </PortfolioModalP>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { Portfolio };
