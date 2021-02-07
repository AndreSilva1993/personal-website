import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Link } from '@src/components/Link';

const AuthorContainer = styled.div`
  display: flex;
  margin-left: -70px;
  width: calc(100% + 140px);
`;

const AuthorPhoto = styled.div`
  width: 50%;
  background: url('https://lmpixels.com/demo/leven-html-new/dark/img/main_photo.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const AuthorDescriptionOuterWrapper = styled.div`
  width: 50%;

  padding: 5rem 7rem 5rem 0;
`;

const AuthorDescriptionInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -70px;
  padding: 7rem 15%;
  background-color: ${({ theme }) => theme.colors.grey05};
`;

const AuthorDescriptionTitle = styled.div`
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colors.grey03};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

const AuthorDescriptionName = styled.h1`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.grey01};
  ${({ theme }) => theme.typography.h1};
`;

const AuthorDescription = styled.p`
  font-size: 1.4rem;
  line-height: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.grey02};
`;

export const Author = () => {
  const theme = useTheme();

  return (
    <AuthorContainer>
      <AuthorPhoto />
      <AuthorDescriptionOuterWrapper>
        <AuthorDescriptionInnerWrapper>
          <AuthorDescriptionTitle>Frontend Developer</AuthorDescriptionTitle>
          <AuthorDescriptionName>André Silva</AuthorDescriptionName>
          <AuthorDescription>
            Fusce tempor magna mi, non egestas velit ultricies nec. Aenean convallis, risus non condimentum gravida,
            odio mauris ullamcorper felis, ut venenatis purus ex eu mi. Quisque imperdiet lacinia urna, a placerat
            sapien pretium eu.
          </AuthorDescription>
          <Link
            href=""
            download
            color={theme.colors.blue}
            textColor={theme.colors.white}
            textHoverColor={theme.colors.white}
          >
            Download CV
          </Link>
        </AuthorDescriptionInnerWrapper>
      </AuthorDescriptionOuterWrapper>
    </AuthorContainer>
  );
};
