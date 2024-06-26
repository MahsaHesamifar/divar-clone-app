"use client";

import { CreatePost } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/wrappers";
import { roles } from "@/constants";

export default function UserPanel() {
  return (
    <ProtectedRoute authorizedRoles={[roles.user, roles.admin]}>
      <div className="py-10 px-5 flex flex-col items-center">
        <h2 className="font-bold text-xl">اضافه کردن آگهی: </h2>
        <CreatePost />
      </div>
    </ProtectedRoute>
  );
}
