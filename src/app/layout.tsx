import type { Metadata } from "next";

import { Header, Footer } from "@/components/layout";
import StoreProvider from "@/services/StoreProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Divar Clone",
  description: "Divar clone application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className="bg-grey-100">
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
