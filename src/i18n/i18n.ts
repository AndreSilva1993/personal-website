import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translations from './translations/en.json';

const initI18n = () => {
  i18next.use(initReactI18next).init({
    lng: 'en',
    defaultNS: 'translations',
    resources: { en: { translations } },
  });
};

export { initI18n };
