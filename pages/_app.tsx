import '@src/theme/global-styles.css';
import '@src/theme/variables.css';

import { initI18next } from '@src/i18n/client';

export default function App({ Component }) {
  initI18next();

  return <Component />;
}
