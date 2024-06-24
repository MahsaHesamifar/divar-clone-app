export type useAuthorizeType = string[];

export type useCheckTokenProps = React.Dispatch<React.SetStateAction<boolean>>;

export interface DecodedToken {
  mobile: string;
  id: string;
  iat: number;
  exp: number;
}
