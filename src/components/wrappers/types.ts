import type { ChildrenProps } from "@/types";

export interface ProtectedRouteProps extends ChildrenProps {
  authorizedRoles: string[];
}
