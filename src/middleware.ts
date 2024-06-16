import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { paths } from "./utils/paths";

const protectedRoutes = [paths.adminPanel(), paths.userPanel()];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith(paths.auth());

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // if (isAuthRoute && accessToken) {
  //   return NextResponse.redirect(new URL("/dashboard/user-panel", request.url));
  // }

  // if (isProtectedRoute && !accessToken) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
