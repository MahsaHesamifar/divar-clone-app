import type { ReactNode } from "react";

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface MessageResponse {
  message: string;
}
