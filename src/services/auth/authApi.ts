import type { MessageResponse } from "@/types";

import { baseStoreApi } from "../baseStore";

import type {
  CheckOtpPayload,
  CheckTokenPayload,
  GetUserRoleRes,
  SendOtpPayload,
  TokensRes,
} from "./types";

export const authApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<MessageResponse, SendOtpPayload>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: {
          mobile,
        },
      }),
    }),
    checkOtp: builder.mutation<TokensRes, CheckOtpPayload>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: {
          mobile,
          code,
        },
      }),
      invalidatesTags: ["User", "Post"],
    }),
    checkRefreshToken: builder.mutation<TokensRes, CheckTokenPayload>({
      query: ({ refreshToken }) => ({
        url: "auth/check-refresh-token",
        method: "POST",
        body: {
          refreshToken,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getUserRole: builder.query<GetUserRoleRes, void>({
      query: () => "user/whoami",
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useSendOtpMutation,
  useCheckOtpMutation,
  useCheckRefreshTokenMutation,
  useGetUserRoleQuery,
} = authApi;
