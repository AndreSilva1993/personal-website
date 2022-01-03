/// <reference types="@emotion/react/types/css-prop" />

import { createTheme } from '@mui/material';

import { colors } from './colors';
import { layers } from './layers';
import { media } from './media';
import { fontWeights } from './fontWeights';

declare module '@emotion/react' {
  interface Theme {
    media: typeof media;
    colors: typeof colors;
    layers: typeof layers;
    fontWeights: typeof fontWeights;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    media: typeof media;
    colors: typeof colors;
    layers: typeof layers;
    fontWeights: typeof fontWeights;
  }

  interface ThemeOptions {
    media: typeof media;
    colors: typeof colors;
    layers: typeof layers;
    fontWeights: typeof fontWeights;
  }
}

export const theme = createTheme({
  media,
  colors,
  layers,
  fontWeights,
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
  },
  typography: {
    fontSize: 22,
    fontFamily: "'Montserrat', sans-serif",
  },
});
