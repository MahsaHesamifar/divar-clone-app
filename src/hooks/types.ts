import { Dispatch, SetStateAction } from "react";

export type UseAuthorizeType = string[];

export type UseCheckTokenProps = Dispatch<SetStateAction<boolean>>;

export interface DecodedToken {
  mobile: string;
  id: string;
  iat: number;
  exp: number;
}
