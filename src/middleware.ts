import createMiddleware from 'next-intl/middleware';
import {AllLocales, AppConfig} from './utils/AppConfig';
import {NextRequest} from 'next/server';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}
