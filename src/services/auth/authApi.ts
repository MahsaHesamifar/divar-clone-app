import { baseStoreApi } from "../baseStore";
import type {
  SendOtpRequest,
  SendOtpResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  CheckTokenRequest,
  CheckTokenResponse,
  GetUserRoleResponse,
} from "./types";

export const authApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: {
          mobile,
        },
      }),
    }),
    checkOtp: builder.mutation<CheckOtpResponse, CheckOtpRequest>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: {
          mobile,
          code,
        },
      }),
    }),
    checkRefreshToken: builder.mutation<CheckTokenResponse, CheckTokenRequest>({
      query: ({ refreshToken }) => ({
        url: "auth/check-refresh-token",
        method: "POST",
        body: {
          refreshToken,
        },
      }),
    }),
    getUserRole: builder.query<GetUserRoleResponse, void>({
      query: () => "user/whoami",
    }),
  }),
});

export const {
  useSendOtpMutation,
  useCheckOtpMutation,
  useCheckRefreshTokenMutation,
  useGetUserRoleQuery,
} = authApi;
