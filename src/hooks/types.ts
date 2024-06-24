export type useAuthorizeType = string[];

export interface DecodedToken {
  mobile: string;
  id: string;
  iat: number;
  exp: number;
}