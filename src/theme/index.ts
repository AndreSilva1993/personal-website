/// <reference types="@emotion/react/types/css-prop" />

import { Theme } from '@emotion/react';

import { colors } from './colors';
import { layers } from './layers';
import { media } from './media';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  export interface Theme {
    media: typeof media;
    colors: typeof colors;
    layers: typeof layers;
    fontWeights: typeof fontWeights;
  }
}

export const theme: Theme = {
  media,
  colors,
  layers,
  fontWeights,
};
