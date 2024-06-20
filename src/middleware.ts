import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { roles } from "@/constants";
import { paths } from "@/utils/paths";

const protectedRoutes = [paths.adminPanel(), paths.userPanel()];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("role")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith(paths.auth());
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = request.nextUrl.pathname.startsWith(paths.adminPanel());

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(paths.userPanel(), request.url));
  }

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL(paths.auth(), request.url));
  }

  if (isAdminRoute && userRole !== roles.admin) {
    const unauthorizedUrl = new URL(paths.unauthorized(), request.url);
    unauthorizedUrl.searchParams.set("attemptedUrl", request.nextUrl.pathname);
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
