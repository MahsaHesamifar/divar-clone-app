"use client";

import type { ErrorProps } from "@/types";

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2>{error.message ? error.message : "خطایی رخ داده است"}</h2>
      <button className="hover:bg-grey-200 rounded" onClick={() => reset()}>
        تلاش مجدد
      </button>
    </div>
  );
}
