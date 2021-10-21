import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { FC } from 'react';

const PortfolioHeading = styled.h1(
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

const PortfolioItemSpan = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5rem;
    bottom: 0;
    position: absolute;
    font-size: 1.8rem;
    color: ${theme.colors.black};
    font-weight: ${theme.fontWeights.boldest};
    background-color: rgba(255, 255, 255, 0.6);

    transform: translateY(100%);
    transition: transform 400ms ease-out;
  `
);

const PortfolioItemDiv = styled.div<{ backgroundImage: string }>(
  ({ backgroundImage }) => css`
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${backgroundImage});
    transition: transform 400ms ease-out;
  `
);

const PortfolioItemWrapperDiv = styled.div`
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &:hover {
    ${PortfolioItemDiv} {
      transform: scale(1.1);
    }

    ${PortfolioItemSpan} {
      transform: translateY(0);
    }
  }
`;

const Portfolio: FC = () => {
  const { t } = useTranslation();

  const portfolioItems = useMemo(
    () => [
      { name: 'Burberry', image: '/images/portfolio/burberry.png' },
      { name: 'Carmo', image: '/images/portfolio/carmo.png' },
      { name: 'Tankey', image: '/images/portfolio/tankey.png' },
      { name: 'TOConline', image: '/images/portfolio/toconline.png' },
    ],
    []
  );

  return (
    <>
      <PortfolioHeading>{t('portfolio.title')}</PortfolioHeading>
      <PortfolioGridDiv>
        {portfolioItems.map(({ name, image }) => (
          <PortfolioItemWrapperDiv key={name}>
            <PortfolioItemDiv backgroundImage={image}></PortfolioItemDiv>
            <PortfolioItemSpan>{name}</PortfolioItemSpan>
          </PortfolioItemWrapperDiv>
        ))}
      </PortfolioGridDiv>
    </>
  );
};

export { Portfolio };
