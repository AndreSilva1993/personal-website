'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';

import translations from './translations/en.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  defaultNS: 'translations',
  resources: { en: { translations } },
});

export function useTranslation() {
  return useTranslationOrg();
}
