"use client";

import { useSearchParams } from "next/navigation";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const attemptedUrl = searchParams.get("attemptedUrl");

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-5">
      <h1 className="font-bold text-5xl text-primary">خطای ۴۰۱</h1>
      <p className="text-2xl py-5">شما به این صفحه دسترسی ندارید.</p>
      <p>Attempted URL: {attemptedUrl}</p>
    </div>
  );
}
