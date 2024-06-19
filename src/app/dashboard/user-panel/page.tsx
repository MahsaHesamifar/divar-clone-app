"use client";

import { useAuthorize } from "@/hooks";
import { roles } from "@/constants";
import { CreatePost } from "@/components/dashboard";

// TODO: create post + show user posts
export default function UserPanel() {
  useAuthorize([roles.user, roles.admin]);
  return (
    <div className="py-10 px-5 flex flex-col items-center">
      <h2 className="font-bold text-xl">اضافه کردن آگهی: </h2>
      <CreatePost />
    </div>
  );
}
