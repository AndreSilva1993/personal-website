import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@src/components/About/ProgressBar';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';

const StyledPageContainer = styled(PageContainer)`
  margin: 0 auto;
  max-width: 96rem;
`;

const AboutImageWrapperDiv = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  position: relative;
  padding-bottom: calc(100% * 9 / 16);
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

    ${theme.media.gteMedium} {
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

    ${theme.media.gteMedium} {
      flex: 0 0 55%;
      margin-right: 5rem;
    }
  `
);

const PersonalInfoUl = styled.ul(
  ({ theme }) => css`
    flex-grow: 1;

    ${theme.media.lteSmall} {
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

    ${theme.media.gteMedium} {
      display: flex;
      justify-content: space-between;
    }
  `
);

const PersonalInfoSpan = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};

    ${theme.media.lteSmall} {
      min-width: 10rem;
      display: inline-block;
    }
  `
);

const TechnologyGridDiv = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 3rem auto 1fr);
    color: ${theme.colors.white};
    font-size: 1.5rem;

    ${theme.media.extraSmall} {
      grid-template-columns: 3rem auto 1fr;
    }
  `
);

const TechnologyGridItemDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
  height: 0.5rem;
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
      { image: 'rails.svg', name: 'Rails', value: 60 },
      { image: 'php.svg', name: 'PHP', value: 50 },
      { image: 'postgresql.svg', name: 'PostgreSQL', value: 50 },
      { image: 'mysql.svg', name: 'MySQL', value: 50 },
      { image: 'angular.svg', name: 'Angular', value: 40 },
    ],
    []
  );

  return (
    <StyledPageContainer>
      <AboutImageWrapperDiv>
        <Image
          alt="About"
          layout="fill"
          src="http://tokyo.ibthemespro.com/assets/img/slider/1.jpg"
        />
      </AboutImageWrapperDiv>
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

      <TechnologyGridDiv>
        {technologiesData.map(({ name, image, value }, index) => (
          <Fragment key={index}>
            <Image alt={name} width={30} height={30} src={`/images/technologies/${image}`} />
            <TechnologyGridItemDiv>{name}</TechnologyGridItemDiv>
            <TechnologyGridItemDiv>
              <StyledProgressBar value={value} delay={0.5 + 0.1 * index} />
            </TechnologyGridItemDiv>
          </Fragment>
        ))}
      </TechnologyGridDiv>
    </StyledPageContainer>
  );
};

export { About };
