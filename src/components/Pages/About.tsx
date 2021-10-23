import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Image } from '@src/components/Image/Image';
import { ProgressBar } from '@src/components/ProgressBar/ProgressBar';

import type { FC } from 'react';

const StyledImage = styled(Image)`
  margin-bottom: 5rem;
`;

const H1 = styled.h1(
  ({ theme }) => css`
    margin-bottom: 3rem;
    color: ${theme.colors.white};
    font-size: 2.2rem;
    font-weight: ${theme.fontWeights.boldest};
  `
);

const AboutDiv = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    margin-bottom: 5rem;

    ${theme.breakpoints.large} {
      flex-direction: row;
    }
  `
);

const P = styled.p(
  ({ theme }) => css`
    font-style: italic;
    line-height: 3rem;
    text-align: justify;
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.lightGrey};

    ${theme.breakpoints.large} {
      flex: 0 0 55%;
      margin-right: 5rem;
    }
  `
);

const PersonalInfoUl = styled.ul(
  ({ theme }) => css`
    flex-grow: 1;

    ${theme.breakpoints.small} {
      margin-top: 3rem;
    }
  `
);

const PersonalInfoLi = styled.li(
  ({ theme }) => css`
    color: ${theme.colors.lightGrey};

    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
    }

    ${theme.breakpoints.large} {
      display: flex;
      justify-content: space-between;
    }
  `
);

const PersonalInfoSpan = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};

    ${theme.breakpoints.small} {
      min-width: 10rem;
      display: inline-block;
    }
  `
);

const TechnologyUl = styled.ul(
  ({ theme }) => css`
    font-size: 1.5rem;
    color: ${theme.colors.lightGrey};

    display: grid;
    grid-gap: 3rem;
    grid-template-columns: repeat(2, 1fr);

    ${theme.breakpoints.extraSmall} {
      grid-template-columns: 1fr;
    }
  `
);

const TechnologyLi = styled.li`
  display: flex;
  align-items: center;
`;

const TechnologyImage = styled(Image)`
  width: 3rem;
  height: 3rem;
  margin-right: 1.5rem;
`;

const StyledProgressBar = styled(ProgressBar)`
  flex: 0 0 60%;
  height: 0.5rem;
  margin-left: auto;
`;

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
      { image: 'rails.svg', name: 'Ruby On Rails', value: 60 },
      { image: 'php.svg', name: 'PHP', value: 50 },
      { image: 'postgresql.svg', name: 'PostgreSQL', value: 50 },
      { image: 'mysql.svg', name: 'MySQL', value: 50 },
      { image: 'angular.svg', name: 'Angular', value: 40 },
    ],
    []
  );

  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: '-10rem', opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <StyledImage src="http://tokyo.ibthemespro.com/assets/img/slider/1.jpg" alt="About" />
      <H1>{t('about.title')}</H1>
      <AboutDiv>
        <P>{t('about.description')}</P>

        <PersonalInfoUl>
          <PersonalInfoLi>
            <PersonalInfoSpan>{t('about.info.birthday')}</PersonalInfoSpan>
            {t('about.info.birthdayAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <PersonalInfoSpan>{t('about.info.email')}</PersonalInfoSpan>
            {t('about.info.emailAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <PersonalInfoSpan>{t('about.info.location')}</PersonalInfoSpan>
            {t('about.info.locationAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <PersonalInfoSpan>{t('about.info.study')}</PersonalInfoSpan>
            {t('about.info.studyAnswer')}
          </PersonalInfoLi>
        </PersonalInfoUl>
      </AboutDiv>

      <H1>{t('about.technologies')}</H1>
      <TechnologyUl>
        {technologiesData.map(({ name, image, value }, index) => (
          <TechnologyLi key={name}>
            <TechnologyImage src={`/images/technologies/${image}`} alt={name} />
            {name}
            <StyledProgressBar value={value} delayAnimation={index} />
          </TechnologyLi>
        ))}
      </TechnologyUl>
    </motion.div>
  );
};

export { About };
