/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react';
import { Theme } from '@emotion/react';

import { colors } from './colors';
import { typography } from './typography';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      blue: string;
      black: string;
      grey01: string;
      grey02: string;
      grey03: string;
      grey04: string;
      grey05: string;
      white: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      bold: number;
      boldest: number;
    };
    typography: {
      h1: string;
    };
  }
}

export const theme: Theme = {
  colors,
  typography,
  fontWeights,
};
