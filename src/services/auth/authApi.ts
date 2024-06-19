import { baseStoreApi } from "../baseStore";
import type {
  SendOtpReq,
  SendOtpRes,
  CheckOtpReq,
  CheckOtpRes,
  CheckTokenReq,
  CheckTokenRes,
  GetUserRoleRes,
} from "../auth";

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
