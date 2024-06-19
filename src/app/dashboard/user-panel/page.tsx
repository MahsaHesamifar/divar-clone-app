"use client";

import { useAuthorize } from "@/hooks";
import { roles } from "@/constants";

// TODO: create post + show user posts
export default function UserPanel() {
  useAuthorize([roles.user, roles.admin]);
  return <div>UserPanel</div>;
}
