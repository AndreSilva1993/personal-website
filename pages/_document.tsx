import Document, { Html, Head, Main, NextScript } from 'next/document';

import { fontWeights } from '@src/theme/fontWeights';

class AppDocument extends Document {
  render() {
    const requiredFontWeights = Object.values(fontWeights).join(';');

    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={`https://fonts.googleapis.com/css2?family=Poppins:wght@${requiredFontWeights}&display=swap`}
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
