export interface SendOtpReq {
  mobile: string;
}
export interface SendOtpRes {
  message: string;
}

export interface CheckOtpReq {
  mobile: string;
  code: string;
}
export interface CheckOtpRes {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface CheckTokenReq {
  refreshToken: string;
}

export interface CheckTokenRes {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface GetUserRoleRes {
  role: string;
  mobile: string;
}
