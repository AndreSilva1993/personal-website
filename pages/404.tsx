import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { css, useTheme, keyframes } from '@emotion/react';

const AstronautKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }
`;

const StarsCanvas = styled.canvas`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
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

const AstronautImageWrapperDiv = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;

  animation: ${AstronautKeyframes} 10s infinite linear;
`;

const PlanetImageWrapperDiv = styled.div(
  ({ theme }) => css`
    width: 50rem;
    height: 50rem;
    position: relative;

    ${theme.breakpoints.extraSmall} {
      width: 30rem;
      height: 30rem;
    }
  `
);

const StyledA = styled.a(
  ({ theme }) => css`
    font-size: 1.5rem;
    padding: 1rem 2rem;
    text-decoration: none;
    text-transform: uppercase;
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    border-radius: 1rem;
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

    drawStars(colors.white);
    drawStars('rgba(0, 169, 255, 0.8)');
  }, []);

  return (
    <>
      <Head>
        <title>{t('404.seo.title')}</title>
        <meta name="description" content={t('404.seo.description')} />
      </Head>
      <StarsCanvas ref={canvasRef} />
      <WrapperDiv>
        <H1>{t('404.title')}</H1>
        <H2>{t('404.description')}</H2>
        <PlanetImageWrapperDiv>
          <Image src="/images/404/planet.svg" layout="fill" />
        </PlanetImageWrapperDiv>
        <AstronautImageWrapperDiv>
          <Image src="/images/404/astronaut.svg" layout="fill" />
        </AstronautImageWrapperDiv>
        <Link href="/">
          <StyledA>{t('404.cta')}</StyledA>
        </Link>
      </WrapperDiv>
    </>
  );
}
