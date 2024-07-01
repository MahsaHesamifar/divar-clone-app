import { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";

import { Loading } from "@/components/elements";
import { Footer, Header } from "@/components/layout";
import { StoreProvider } from "@/services/StoreProvider";
import type { RootLayoutProps } from "@/types/types";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Divar Clone",
  description: "Divar clone application",
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" dir="rtl">
      <body className="bg-grey-100">
        <StoreProvider>
          <ToastContainer />
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
