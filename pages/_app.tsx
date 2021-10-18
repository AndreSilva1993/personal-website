import { ThemeProvider } from '@emotion/react';

import '@src/theme/global-styles.css';
import { theme } from '@src/theme';
import { MainContainer } from '@src/components/MainContainer/MainContainer';

export default function App({ Component, props }) {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Component {...props} />
      </MainContainer>
    </ThemeProvider>
  );
}
