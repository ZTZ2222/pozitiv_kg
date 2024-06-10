import {LocalePrefix} from 'next-intl/routing';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Positiv',
  locales: [
    {
      id: 'ru',
      name: 'Русский',
    },
    {
      id: 'en',
      name: 'English',
    },
    {
      id: 'ky',
      name: 'Кыргызча',
    },
  ],
  defaultLocale: 'ru',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);
