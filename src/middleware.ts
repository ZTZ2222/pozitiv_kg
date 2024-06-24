import { type NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";
import { jwtVerify } from "jose";

import { zTokenPayload } from "./types/token.schema";
import { i18nMiddleware } from "./lib/i18n";

const tokenStore = new NodeCache({ stdTTL: 600 });
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedRoutes = [
  /^\/dashboard(.*)/,
  /^\/\w{2}\/dashboard(.*)/,
  /^\/protected-example-route(.*)/,
  /^\/\w{2}\/protected-example-route(.*)/,
  /^\/admin(.*)/,
  /^\/\w{2}\/admin(.*)/,
];

const isProtectedRoute = (pathname: string) =>
  protectedRoutes.some((route) => route.test(pathname));

const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as zTokenPayload;
  } catch (error) {
    return null;
  }
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const locale = pathname.match(/^\/(\w{2})\//)?.[1] || "";
    const loginUrl = new URL(`${locale}/login`, request.url);
    const homeUrl = new URL(`${locale}/`, request.url);

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    let tokenPayload = tokenStore.get<zTokenPayload>(token);

    if (!tokenPayload) {
      tokenPayload = await verifyToken(token);
      if (!tokenPayload) {
        return NextResponse.redirect(loginUrl);
      }

      tokenStore.set(token, tokenPayload);
    }

    if (tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.redirect(loginUrl);
    }

    if (tokenPayload.is_superuser === false) {
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
