import type { ReactNode } from "react";

export interface ProtectedRouteProps {
  authorizedRoles: string[];
  children: ReactNode;
}
