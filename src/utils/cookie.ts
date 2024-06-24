import Cookies from "js-cookie";

import type { setRoleType, setTokenType } from "./types";

export const destroyTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("role");
};

export const setTokens = ({ accessToken, refreshToken }: setTokenType) => {
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

export const setRole = (role: setRoleType) => {
  Cookies.set("role", role);
};
