import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseStoreApi } from "@/services/baseStore";

const rootReducer = combineReducers({
  [baseStoreApi.reducerPath]: baseStoreApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseStoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
