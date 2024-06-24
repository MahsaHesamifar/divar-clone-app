"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/rtk/store";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={makeStore}>{children}</Provider>;
};
