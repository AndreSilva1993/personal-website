'use client';

import styles from './NotFoundPage.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const numberOfStars = 600;
    const canvasContext = canvasRef.current.getContext('2d');

    const { offsetWidth, offsetHeight } = canvasRef.current;
    canvasRef.current.width = offsetWidth;
    canvasRef.current.height = offsetHeight;

    canvasContext.fillStyle = '#111';
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

    drawStars('#BB86FC');
    drawStars('#555555');
    drawStars('#FFFFFF');
  }, []);

  return (
    <>
      <canvas className={styles.canvas} ref={canvasRef} />
      <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t('404.title')}</h1>
          <h2 className={styles.subTitle}>{t('404.description')}</h2>
          <div className={styles.imagesWrapper}>
            <div className={styles.planetImageWrapper}>
              <Image priority fill src="/images/404/planet.svg" alt="Planet" />
            </div>
            <div className={styles.astronautImageWrapper}>
              <Image priority fill src="/images/404/astronaut.svg" alt="Astronaut" />
            </div>
          </div>
          <Link href="/" className={styles.link}>
            {t('404.cta')}
          </Link>
        </div>
      </div>
    </>
  );
}
