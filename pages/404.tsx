import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { css, useTheme, keyframes } from '@emotion/react';

const AstronautKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StarsCanvas = styled.canvas`
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const OuterWrapperDiv = styled.div`
  padding: 10rem;
`;

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Dosis', sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 10rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const H2 = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const ImagesWrapperDiv = styled.div`
  position: relative;
`;

const AstronautImageDiv = styled.div`
  top: 5rem;
  right: 5rem;
  width: 5rem;
  height: 5rem;
  position: absolute;

  animation: ${AstronautKeyframes} 10s infinite linear;
`;

const PlanetImageDiv = styled.div(
  ({ theme }) => css`
    width: 50rem;
    height: 50rem;
    position: relative;

    ${theme.media.extraSmall} {
      width: 30rem;
      height: 30rem;
    }
  `
);

const StyledA = styled.a(
  ({ theme }) => css`
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    text-decoration: none;
    text-transform: uppercase;
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    border-radius: 1rem;
    transition: color 150ms ease-out, background-color 150ms ease-out;

    &:hover {
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
    }
  `
);

export default function Page() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const numberOfStars = 600;
    const canvasContext = canvasRef.current.getContext('2d');

    const { offsetWidth, offsetHeight } = canvasRef.current;
    canvasRef.current.width = offsetWidth;
    canvasRef.current.height = offsetHeight;

    canvasContext.fillStyle = colors.darkGrey;
    canvasContext.fillRect(0, 0, offsetWidth, offsetHeight);

    const drawStars = (color: string) => {
      for (let count = 0; count < numberOfStars; count += 1) {
        const x = Math.random() * offsetWidth;
        const y = Math.random() * offsetHeight;
        const starRadius = Math.random() * 1.5;

        canvasContext.beginPath();
        canvasContext.arc(x, y, starRadius, 0, 360);
        canvasContext.fillStyle = color;
        canvasContext.fill();
      }
    };

    drawStars(colors.pink);
    drawStars(colors.grey);
    drawStars(colors.white);
  }, []);

  return (
    <>
      <Head>
        <title>{t('404.seo.title')}</title>
        <meta name="description" content={t('404.seo.description')} />

        <link href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" rel="stylesheet" />
      </Head>
      <StarsCanvas ref={canvasRef} />
      <OuterWrapperDiv>
        <WrapperDiv>
          <H1>{t('404.title')}</H1>
          <H2>{t('404.description')}</H2>
          <ImagesWrapperDiv>
            <PlanetImageDiv>
              <Image src="/images/404/planet.svg" layout="fill" alt="Planet" />
            </PlanetImageDiv>
            <AstronautImageDiv>
              <Image src="/images/404/astronaut.svg" layout="fill" alt="Astronaut" />
            </AstronautImageDiv>
          </ImagesWrapperDiv>
          <Link href="/" passHref>
            <StyledA>{t('404.cta')}</StyledA>
          </Link>
        </WrapperDiv>
      </OuterWrapperDiv>
    </>
  );
}
