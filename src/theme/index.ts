/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react';
import { Theme } from '@emotion/react';

import { colors } from './colors';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    fontWeights: typeof fontWeights;
  }
}

export const theme: Theme = {
  colors,
  fontWeights,
};
