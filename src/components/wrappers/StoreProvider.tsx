"use client";

import { Provider } from "react-redux";

import { store } from "@/rtk/store";
import type { ChildrenProps } from "@/types";

export const StoreProvider = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};
