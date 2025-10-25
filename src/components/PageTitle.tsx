import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

interface PageTitleProps {
  title: string;
  separator?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  separator = '|',
}) => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('appTitle')} ${separator} ${title}`;
  }, [location, title]);

  return null;
};

export default PageTitle;
