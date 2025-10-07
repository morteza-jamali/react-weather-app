import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { StorageKey } from './hooks/use-language';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem(StorageKey) || 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
