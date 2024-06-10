import {type NextFetchEvent, type NextRequest, NextResponse} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {AllLocales, AppConfig} from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = (pathname: string) => {
  const protectedRoutes = [
    /^\/dashboard(.*)/,
    /^\/\w{2}\/dashboard(.*)/,
    /^\/onboarding(.*)/,
    /^\/\w{2}\/onboarding(.*)/,
  ];
  return protectedRoutes.some(route => route.test(pathname));
};

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  const {pathname} = request.nextUrl;

  if (
    pathname.includes('/sign-in') ||
    pathname.includes('/sign-up') ||
    isProtectedRoute(pathname)
  ) {
    // Handle protected routes and authentication logic here
    const locale = pathname.match(/\/(\w{2})\/dashboard/)?.[1] || '';
    const signInUrl = new URL(`${locale}/sign-in`, request.url);

    // Check for authentication (mock logic, replace with actual auth check)
    const isAuthenticated = request.headers.get('authorization'); // Example check, replace with your logic

    if (isProtectedRoute(pathname) && !isAuthenticated) {
      // Redirect to sign-in page if not authenticated
      return NextResponse.redirect(signInUrl);
    }

    if (
      isAuthenticated &&
      pathname.includes('/dashboard') &&
      !pathname.endsWith('/organization-selection')
    ) {
      const orgSelection = new URL(
        '/onboarding/organization-selection',
        request.url,
      );

      return NextResponse.redirect(orgSelection);
    }

    return intlMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
