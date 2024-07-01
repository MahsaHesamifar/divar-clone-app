import { MessageResponse } from "@/types";

export interface TokensRes extends MessageResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SendOtpPayload {
  mobile: string;
}

export interface CheckOtpPayload {
  mobile: string;
  code: string;
}

export interface CheckTokenPayload {
  refreshToken: string;
}

export interface GetUserRoleRes {
  role: string;
  mobile: string;
}
