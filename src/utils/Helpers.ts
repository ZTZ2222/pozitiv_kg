import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

import {AppConfig} from './AppConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};
