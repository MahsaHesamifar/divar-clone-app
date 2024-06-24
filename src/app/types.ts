import type { ReactNode } from "react";

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface RootLayoutProps {
  children: ReactNode;
}
