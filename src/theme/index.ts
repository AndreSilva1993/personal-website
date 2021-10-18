/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react';
import { Theme } from '@emotion/react';

import { colors } from './colors';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      black: string;
      white: string;
      darkGrey: string;
      lightGrey: string;
    };
    fontWeights: {
      bold: number;
    };
  }
}

export const theme: Theme = {
  colors,
  fontWeights,
};
