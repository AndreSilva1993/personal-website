import styles from './About.module.css';
import AboutImage from '@public/images/about/about.jpeg';

import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@src/components/About/ProgressBar';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';

const About: FC = () => {
  const { t } = useTranslation();

  const technologiesData = useMemo(
    () => [
      { image: 'react.svg', name: 'ReactJS', value: 100 },
      { image: 'typescript.svg', name: 'TypeScript', value: 100 },
      { image: 'javascript.svg', name: 'JavaScript', value: 100 },
      { image: 'css.svg', name: 'CSS', value: 100 },
      { image: 'html.svg', name: 'HTML 5', value: 100 },
      { image: 'next.svg', name: 'Next.js', value: 100 },
      { image: 'node.svg', name: 'Node.js', value: 80 },
      { image: 'jest.svg', name: 'Jest', value: 80 },
      { image: 'polymer.svg', name: 'Polymer', value: 70 },
      { image: 'rails.svg', name: 'Rails', value: 60 },
      { image: 'php.svg', name: 'PHP', value: 50 },
      { image: 'postgresql.svg', name: 'PostgreSQL', value: 50 },
      { image: 'mysql.svg', name: 'MySQL', value: 50 },
      { image: 'angular.svg', name: 'Angular', value: 40 },
    ],
    []
  );

  return (
    <PageContainer className={styles.pageContainer}>
      <div className={styles.imageWrapper}>
        <Image
          alt="About"
          layout="fill"
          src={AboutImage}
          placeholder="blur"
          objectFit="cover"
          sizes="(max-width: 992px) 100vw, 75vw"
        />
      </div>

      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{t('about.title')}</h1>
        <div className={styles.socialWrapper}>
          <a
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            href={process.env.NEXT_PUBLIC_GITHUB_URL}
          >
            <Image width={25} height={25} src="/images/about/github.svg" alt="GitHub" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          >
            <Image width={25} height={25} src="/images/about/linkedin.svg" alt="LinkedIn" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
          >
            <Image width={25} height={25} src="/images/about/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
      <div className={styles.descriptionWrapper}>{t('about.description')}</div>

      <h1 className={styles.title}>{t('about.technologies')}</h1>

      <div className={styles.technologiesGridWrapper}>
        {technologiesData.map(({ name, image, value }, index) => (
          <Fragment key={index}>
            <Image
              alt={name}
              width={30}
              height={30}
              src={`/images/about/${image}`}
              loading="eager"
            />
            <div className={styles.technologyGridItem}>{name}</div>
            <div className={styles.technologyGridItem}>
              <ProgressBar className={styles.progressBar} value={value} delay={0.5 + 0.1 * index} />
            </div>
          </Fragment>
        ))}
      </div>
    </PageContainer>
  );
};

export { About };
