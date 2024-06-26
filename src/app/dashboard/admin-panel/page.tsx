"use client";

import { CreateCategory } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/wrappers";
import { roles } from "@/constants";

export default function AdminPanel() {
  return (
    <ProtectedRoute authorizedRoles={[roles.admin]}>
      <div className="py-10 px-5 flex flex-col items-center">
        <h2 className="font-bold text-xl">اضافه کردن دسته بندی: </h2>
        <CreateCategory />
      </div>
    </ProtectedRoute>
  );
}
