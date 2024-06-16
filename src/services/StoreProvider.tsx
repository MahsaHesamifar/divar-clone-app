"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { makeStore, persistor } from "@/rtk/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={makeStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
