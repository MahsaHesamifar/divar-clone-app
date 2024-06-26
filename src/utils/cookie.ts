import Cookies from "js-cookie";

import type { setRoleType, setTokenType } from "./types";

export const destroyTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("role");
};

export const setTokens = ({ accessToken, refreshToken }: setTokenType) => {
  let inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
  Cookies.set("accessToken", accessToken, { expires: inTenMinutes });
  Cookies.set("refreshToken", refreshToken, { expires: 1 });
};

export const setRole = (role: setRoleType) => {
  Cookies.set("role", role);
};
