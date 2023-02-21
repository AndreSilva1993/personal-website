import { createInstance } from 'i18next';

import translations from './translations/en.json';

export async function initI18next() {
  const i18nInstance = createInstance();
  await i18nInstance.init({
    lng: 'en',
    defaultNS: 'translations',
    resources: { en: { translations } },
  });

  return { t: i18nInstance.getFixedT('en') };
}
