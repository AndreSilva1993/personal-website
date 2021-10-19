import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { PageContainer } from './PageContainer';
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

const AboutDiv = styled.div`
  display: flex;
  font-size: 1.5rem;
  margin-bottom: 5rem;
`;

const P = styled.p(
  ({ theme }) => css`
    font-style: italic;
    line-height: 3rem;
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.lightGrey};

    flex: 0 0 55%;
    margin-right: 5rem;
  `
);

const PersonalInfoUl = styled.ul`
  flex-grow: 1;
`;

const PersonalInfoLi = styled.li(
  ({ theme }) => css`
    margin-bottom: 1.5rem;
    color: ${theme.colors.lightGrey};
  `
);

const Span = styled.span(
  ({ theme }) => css`
    min-width: 10rem;
    display: inline-block;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};
  `
);

const TechnologyUl = styled.ul(
  ({ theme }) => css`
    font-size: 1.5rem;
    color: ${theme.colors.lightGrey};

    display: grid;
    grid-gap: 3rem;
    grid-template-columns: repeat(2, 1fr);
  `
);

const TechnologyLi = styled.li`
  display: flex;
  align-items: center;
`;

const TechnologyImageDiv = styled.div`
  padding: 0.5rem;
  background-color: white;
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

  const age = useMemo(() => {
    var birthdayDateDiff = new Date(Date.now() - new Date(1993, 9, 14).getTime());

    return Math.abs(birthdayDateDiff.getUTCFullYear() - 1970);
  }, []);

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
    <PageContainer>
      <StyledImage src="http://tokyo.ibthemespro.com/assets/img/slider/1.jpg" />
      <H1>{t('about.name')}</H1>
      <AboutDiv>
        <P>{t('about.description')}</P>

        <PersonalInfoUl>
          <PersonalInfoLi>
            <Span>{t('about.info.birthday')}</Span>
            {t('about.info.birthdayAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <Span>{t('about.info.age')}</Span>
            {age}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <Span>{t('about.info.email')}</Span>
            {t('about.info.emailAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <Span>{t('about.info.location')}</Span>
            {t('about.info.locationAnswer')}
          </PersonalInfoLi>
          <PersonalInfoLi>
            <Span>{t('about.info.study')}</Span>
            {t('about.info.studyAnswer')}
          </PersonalInfoLi>
        </PersonalInfoUl>
      </AboutDiv>

      <H1>{t('about.technologies')}</H1>
      <TechnologyUl>
        {technologiesData.map(({ name, image, value }, index) => (
          <TechnologyLi key={name}>
            <TechnologyImage src={`/images/${image}`} />
            {name}
            <StyledProgressBar value={value} delayAnimation={index} />
          </TechnologyLi>
        ))}
      </TechnologyUl>
    </PageContainer>
  );
};

export { About };
