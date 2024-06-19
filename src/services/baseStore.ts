import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { logOut, setTokens } from "@/rtk/features/authSlice";
import type { RootState } from "@/rtk/store";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;
        console.log("checkRefreshTokenResponse: ", state.auth);

        const refreshResult = await baseQuery(
          {
            url: "/auth/check-refresh-token",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // store the new tokens
          const data = refreshResult.data as RefreshTokenResponse;
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          api.dispatch(
            setTokens({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            })
          );

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseStoreApi = createApi({
  reducerPath: "baseStoreApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["User", "Category"],

  endpoints: (builder) => ({}),
});
