import type {
  CheckOtpReq,
  CheckOtpRes,
  CheckTokenReq,
  CheckTokenRes,
  GetUserRoleRes,
  SendOtpReq,
  SendOtpRes,
} from "../auth";
import { baseStoreApi } from "../baseStore";

export const authApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpRes, SendOtpReq>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: {
          mobile,
        },
      }),
    }),
    checkOtp: builder.mutation<CheckOtpRes, CheckOtpReq>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: {
          mobile,
          code,
        },
      }),
      invalidatesTags: ["User"],
    }),
    checkRefreshToken: builder.mutation<CheckTokenRes, CheckTokenReq>({
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

      providesTags: ["User"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useCheckOtpMutation,
  useCheckRefreshTokenMutation,
  useGetUserRoleQuery,
} = authApi;
