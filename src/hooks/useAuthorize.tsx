"use client";

import { useEffect } from "react";
import { usePathname, useRouter,useSearchParams } from "next/navigation";

import { useGetUserRoleQuery } from "@/services/auth";
import { paths } from "@/utils/paths";

type useAuthorizeType = string[];

// Why this code is needed: the user might change their role manually, in this case, they must be denied access to protected pages
export const useAuthorize = (requiredRoles: useAuthorizeType) => {
  const { data, error, isLoading } = useGetUserRoleQuery();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptedUrl =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

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
      if (!requiredRoles.includes(role)) {
        redirectToUnauthorized();
      }
    }
  }, [data, isLoading, router, requiredRoles, error, attemptedUrl]);
};
