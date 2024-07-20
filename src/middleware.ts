import createMiddleware from "next-intl/middleware";
import { AllLocales, AppConfig } from "./lib/i18n";
import { NextResponse, type NextRequest } from "next/server";
import { exchangeCodeForToken } from "./actions/auth-actions";

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.endsWith("/auth/google/redirect")) {
    return intlMiddleware(request);
  }

  const locale = request.nextUrl.pathname.match(/^\/(\w{2})\//)?.[1] || "";
  const loginUrl = new URL(`${locale}/login`, request.url);
  const homePage = new URL(`${locale}/`, request.url);
  const code = request.nextUrl.searchParams.get("code");
  if (code) {
    try {
      const token = await exchangeCodeForToken(code);
      const redirectResponse = NextResponse.redirect(homePage);
      redirectResponse.cookies.set("access_token", token, { path: "/" });
      return redirectResponse;
    } catch (error) {
      console.error("Failed to exchange code for token:", error);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
