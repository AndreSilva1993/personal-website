import '@src/theme/global-styles.css';
import '@src/theme/variables.css';

import { MainContainer } from '@src/components/MainContainer/MainContainer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" rel="stylesheet" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body>
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
