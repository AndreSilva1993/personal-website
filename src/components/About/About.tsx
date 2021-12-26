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

const TitleWrapperDiv = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${theme.media.extraSmall} {
      flex-direction: column;
    }
  `
);

const H1 = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 2.2rem;
    font-weight: ${theme.fontWeights.boldest};

    ${theme.media.extraSmall} {
      text-align: center;
    }
  `
);
const SocialContainerDiv = styled.div`
  display: flex;
`;

const StyledSocialA = styled.a`
  &:not(:first-of-type) {
    margin-left: 2rem;
  }
`;

const AboutDiv = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    margin: 3rem 0;

    font-style: italic;
    line-height: 3rem;
    text-align: justify;
    color: ${theme.colors.lightGrey};
    font-weight: ${theme.fontWeights.normal};

    ${theme.media.gteMedium} {
      flex-direction: row;
    }
  `
);

const TechnologyGridDiv = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-gap: 2rem;
    margin-top: 3rem;
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
          src="/images/about/about.jpeg"
          objectFit="cover"
          sizes="(max-width: 992px) 100vw, 75vw"
        />
      </AboutImageWrapperDiv>

      <TitleWrapperDiv>
        <H1>{t('about.title')}</H1>
        <SocialContainerDiv>
          <StyledSocialA target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_URL}>
            <Image width={25} height={25} src="/images/about/github.svg" alt="GitHub" />
          </StyledSocialA>
          <StyledSocialA target="_blank" href={process.env.NEXT_PUBLIC_LINKEDIN_URL}>
            <Image width={25} height={25} src="/images/about/linkedin.svg" alt="LinkedIn" />
          </StyledSocialA>
          <StyledSocialA target="_blank" href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}>
            <Image width={25} height={25} src="/images/about/instagram.svg" alt="Instagram" />
          </StyledSocialA>
        </SocialContainerDiv>
      </TitleWrapperDiv>
      <AboutDiv>{t('about.description')}</AboutDiv>

      <H1>{t('about.technologies')}</H1>

      <TechnologyGridDiv>
        {technologiesData.map(({ name, image, value }, index) => (
          <Fragment key={index}>
            <Image
              alt={name}
              width={30}
              height={30}
              src={`/images/about/${image}`}
              loading="eager"
            />
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
