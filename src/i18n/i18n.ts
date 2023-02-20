import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

import translations from './translations/en.json';

export const initI18next = async () => {
  const i18nInstance = createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'en',
    defaultNS: 'translations',
    resources: { en: { translations } },
  });

  return { t: i18nInstance.getFixedT('en') };
};
