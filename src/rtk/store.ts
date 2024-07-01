import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/services/base";

import { rtkQueryErrorLogger } from "./middlewares";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
