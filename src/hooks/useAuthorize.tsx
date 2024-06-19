"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetUserRoleQuery } from "@/services/auth";
import { paths } from "@/utils/paths";

// Why this code is needed: the user might change their role manually, in this case, they must be denied access to protected pages
export const useAuthorize = (requiredRoles: string[]) => {
  const { data, error, isLoading } = useGetUserRoleQuery();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptedUrl =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

  const redirectToUnauthorized = () => {
    router.push(
      `${paths.unauthorized()}?attemptedUrl=${encodeURIComponent(attemptedUrl)}`
    );
  };
  useEffect(() => {
    if (error) redirectToUnauthorized();
    else if (!isLoading && data) {
      const { role } = data;
      if (!requiredRoles.includes(role)) {
        redirectToUnauthorized();
      }
    }
  }, [data, isLoading, router, requiredRoles]);
};
