"use client";

import type { ErrorProps } from "@/types";

export default function Error({ error, reset }: ErrorProps) {
  const resetHandler = () => reset();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2>{error.message ? error.message : "خطایی رخ داده است"}</h2>
      <button
        className="bg-grey-200 hover:bg-grey-300 rounded p-2 m-2"
        onClick={resetHandler}
      >
        تلاش مجدد
      </button>
    </div>
  );
}
