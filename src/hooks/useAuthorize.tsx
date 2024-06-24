"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { paths, setRole } from "@/utils";

import type { UseAuthorizeType } from "./types";

export const useAuthorize = (requiredRoles: UseAuthorizeType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptedUrl =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");
    const role = Cookies.get("role");

    const redirectToUnauthorized = () => {
      router.push(
        `${paths.unauthorized()}?attemptedUrl=${encodeURIComponent(
          attemptedUrl
        )}`
      );
    };

    if (!accessToken && !refreshToken) {
      router.push(paths.auth());
    } else if (!role) redirectToUnauthorized();
    else {
      setRole(role);
      if (!requiredRoles.includes(role)) {
        redirectToUnauthorized();
      }
    }
  }, [router, requiredRoles, attemptedUrl]);
};
