export interface SendOtpRequest {
  mobile: string;
}
export interface SendOtpResponse {
  message: string;
}

export interface CheckOtpRequest {
  mobile: string;
  code: string;
}
export interface CheckOtpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface CheckTokenRequest {
  refreshToken: string;
}

export interface CheckTokenResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface GetUserRoleResponse {
  role: string;
}
