/// <reference types="@emotion/react/types/css-prop" />

import { Theme } from '@emotion/react';

import { colors } from './colors';
import { layers } from './layers';
import { breakpoints } from './breakpoints';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    layers: typeof layers;
    breakpoints: typeof breakpoints;
    fontWeights: typeof fontWeights;
  }
}

export const theme: Theme = {
  colors,
  layers,
  fontWeights,
  breakpoints,
};
