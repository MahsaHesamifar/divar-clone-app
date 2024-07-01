import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { roles } from "@/constants";
import { paths } from "@/utils";

const protectedRoutes = [paths.adminPanel(), paths.userPanel()];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const userRole = request.cookies.get("role")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith(paths.auth());
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = request.nextUrl.pathname.startsWith(paths.adminPanel());

  const redirectToUserPanel = isAuthRoute && accessToken;
  const redirectToAuth = isProtectedRoute && !accessToken && !refreshToken;
  const redirectToUnauthorized = isAdminRoute && userRole !== roles.admin;

  if (redirectToUserPanel) {
    return NextResponse.redirect(new URL(paths.userPanel(), request.url));
  }

  if (redirectToAuth) {
    return NextResponse.redirect(new URL(paths.auth(), request.url));
  }

  if (redirectToUnauthorized) {
    const unauthorizedUrl = new URL(paths.unauthorized(), request.url);
    unauthorizedUrl.searchParams.set("attemptedUrl", request.nextUrl.pathname);
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
