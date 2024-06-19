"use client";

import React from "react";

import { roles } from "@/constants";
import { useAuthorize } from "@/hooks";
import { CreateCategory } from "@/components/dashboard";

// TODO: create category
export default function AdminPanel() {
  useAuthorize([roles.admin]);

  return (
    <div className="py-10 px-5 flex flex-col items-center">
      <h2 className="font-bold text-xl">اضافه کردن دسته بندی: </h2>
      <CreateCategory />
    </div>
  );
}
