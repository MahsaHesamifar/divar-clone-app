"use client";

import React from "react";

import { roles } from "@/constants";
import { useAuthorize } from "@/hooks";

// TODO: create post + show user posts
export default function UserPanel() {
  useAuthorize([roles.user, roles.admin]);
  return <div>UserPanel</div>;
}
