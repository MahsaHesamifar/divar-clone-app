"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { RootState } from "@/rtk/store";
import { useGetUserRoleQuery } from "@/services/auth";
import { paths } from "@/utils/paths";

import type { useAuthorizeType } from "./types";

// Why this code is needed: the user might change their role manually, in this case, they must be denied access to protected pages
export const useAuthorize = (requiredRoles: useAuthorizeType) => {
  const { data, error, isLoading } = useGetUserRoleQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptedUrl =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  const { isTokenValid } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

    if (!accessToken && !refreshToken && !isTokenValid)
      router.push(paths.auth());
    return;
  }, [isTokenValid, router]);

  useEffect(() => {
    const redirectToUnauthorized = () => {
      router.push(
        `${paths.unauthorized()}?attemptedUrl=${encodeURIComponent(
          attemptedUrl
        )}`
      );
    };

    if (error) redirectToUnauthorized();
    else if (!isLoading && data) {
      const { role } = data;
      Cookies.set("role", role);
      if (!requiredRoles.includes(role)) {
        redirectToUnauthorized();
      }
    }
  }, [isLoading, router, requiredRoles, error, data, attemptedUrl]);
};
