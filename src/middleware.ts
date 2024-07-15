import { type NextRequest, NextResponse } from "next/server";

import { i18nMiddleware } from "./lib/i18n";
import { checkRoute } from "./lib/utils";
import { validateAccessToken } from "./lib/auth";
import { exchangeCodeForToken } from "./actions/auth-actions";

const protectedRoutes = [
  /^\/chat(.*)/,
  /^\/\w{2}\/chat(.*)/,
  /^\/favorites(.*)/,
  /^\/\w{2}\/favorites(.*)/,
  /^\/profile(.*)/,
  /^\/\w{2}\/profile(.*)/,
  /^\/ads\/post(.*)/,
  /^\/\w{2}\/ads\/post(.*)/,
  /^\/ads\/\d+\/edit/,
  /^\/\w{2}\/ads\/\d+\/edit/,
];

export default async function middleware(
  request: NextRequest,
  response: NextResponse,
) {
  const { pathname } = request.nextUrl;
  const locale = pathname.match(/^\/(\w{2})\//)?.[1] || "";
  const loginUrl = new URL(`${locale}/login`, request.url);
  const homePage = new URL(`${locale}/`, request.url);

  if (pathname.includes("/auth/google/redirect")) {
    const code = request.nextUrl.searchParams.get("code");
    if (code) {
      try {
        const token = await exchangeCodeForToken(code);
        const response = NextResponse.redirect(homePage);
        response.cookies.set("access_token", token, { path: "/" });
        return response;
      } catch (error) {
        console.error("Failed to exchange code for token:", error);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  if (checkRoute(pathname, protectedRoutes)) {
    const isAuthenticated = await validateAccessToken();

    if (!isAuthenticated) {
      return NextResponse.redirect(loginUrl);
    }

    return i18nMiddleware(request);
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
