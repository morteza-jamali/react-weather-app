import { useTranslation } from 'react-i18next';

export const StorageKey = 'lang';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(StorageKey, lang);
  };

  return { changeLang };
};

export default useLanguage;
