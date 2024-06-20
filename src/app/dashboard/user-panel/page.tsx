"use client";

import { CreatePost } from "@/components/dashboard";
import { roles } from "@/constants";
import { useAuthorize } from "@/hooks";

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
