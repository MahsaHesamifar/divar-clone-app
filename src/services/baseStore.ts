import {
  setAccessToken,
  logOut,
  setRefreshToken,
} from "@/rtk/features/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import type { RootState } from "@/rtk/store";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3400/",
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
        console.log(state.auth);
        console.log(state.auth.accessToken);

        const refreshResult = await baseQuery(
          {
            url: "/auth/check-refresh-token",
            method: "POST",
            body: { refreshToken },
            // body: {
            //   refreshToken:
            //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTkxMjMyMDI4MyIsImlkIjoiNjY2ZDI3OTU5NWJjN2IwMGQxMTk0MzA0IiwiaWF0IjoxNzE4NTI0OTQ4LCJleHAiOjE3NTEzNDc0NzM4MTd9.8QhXUetPioJhHnvbitG9Nm9bC8i95yq-lG_yAREntOQ",
            // },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // store the new tokens
          const data = refreshResult.data as RefreshTokenResponse;
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          document.cookie = `accessToken=${newAccessToken}; path=/`;
          document.cookie = `refreshToken=${newRefreshToken}; path=/`;

          api.dispatch(setAccessToken({ accessToken: newAccessToken }));
          api.dispatch(setRefreshToken({ refreshToken: newRefreshToken }));

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
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: ["User"],

  endpoints: (builder) => ({}),
});
