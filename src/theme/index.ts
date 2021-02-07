import '@emotion/react';
import { Theme } from '@emotion/react';

import { colors } from './colors';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      blue: string;
      black: string;
      grey: string;
      white: string;
    };
    fontWeights: {
      normal: number;
      bold: number;
      boldest: number;
    };
  }
}

export const theme: Theme = {
  colors: colors,
  fontWeights: fontWeights,
};
