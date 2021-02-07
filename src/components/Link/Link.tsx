import styled from '@emotion/styled';
import { FC } from 'react';

interface LinkProps {
  /**
   * This property sets the border color as well as the background color when the link is being hovered.
   */
  color?: string;
  /**
   * The link's href.
   */
  href: string;
  /**
   * If set to true, this forces the browser to download the link's response.
   */
  download?: boolean;
  /**
   * This property sets the text color.
   */
  textColor?: string;
  /**
   * This property sets the text color when the link os being hovered.
   */
  textHoverColor?: string;
}

const A = styled.a<LinkProps>`
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: 9999px;
  padding: 1.2rem 3rem;
  text-decoration: none;
  width: fit-content;
  box-shadow: 0 10px 10px -8px rgb(0 0 0 / 78%);
  transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
  color: ${({ theme, textColor }) => (textColor ? textColor : theme.colors.white)};
  border: 2px solid ${({ theme, color }) => (color ? color : theme.colors.grey02)};
  &:hover {
    background-color: ${({ theme, color }) => (color ? color : theme.colors.grey02)};
    color: ${({ theme, textHoverColor }) => (textHoverColor ? textHoverColor : theme.colors.grey05)};
  }
`;

export const Link: FC<LinkProps> = ({ children, download, href, ...remainingProps }) => {
  return (
    <A download={download} href={href} {...remainingProps}>
      {children}
    </A>
  );
};
