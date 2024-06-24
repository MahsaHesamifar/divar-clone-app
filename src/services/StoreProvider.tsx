"use client";

import { Provider } from "react-redux";

import { store } from "@/rtk/store";

import type { StoreProviderProps } from "./types";

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
