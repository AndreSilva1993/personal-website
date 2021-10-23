/// <reference types="@emotion/react/types/css-prop" />

import { Theme } from '@emotion/react';

import { colors } from './colors';
import { breakpoints } from './breakpoints';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    breakpoints: typeof breakpoints;
    fontWeights: typeof fontWeights;
  }
}

export const theme: Theme = {
  colors,
  fontWeights,
  breakpoints,
};
