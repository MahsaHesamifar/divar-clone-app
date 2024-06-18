"use client";

import React from "react";

import { roles } from "@/constants";
import { useAuthorize } from "@/hooks";

// TODO: create category
export default function AdminPanel() {
  useAuthorize(roles.admin);
  return <div className="">AdminPanel</div>;
}
