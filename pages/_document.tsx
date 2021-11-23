import i18next from 'i18next';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { fontWeights } from '@src/theme/fontWeights';

class AppDocument extends Document {
  render() {
    const requiredFontWeights = Object.values(fontWeights).join(';');

    return (
      <Html lang={i18next.language}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Dosis" rel="stylesheet" />
          <link
            href={`https://fonts.googleapis.com/css2?family=Montserrat:wght@${requiredFontWeights}&display=swap`}
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
