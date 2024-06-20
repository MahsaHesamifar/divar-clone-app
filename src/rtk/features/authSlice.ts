import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { baseStoreApi } from "@/services/baseStore";

interface InitialStateType {
  mobile: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

const initialState: InitialStateType = {
  mobile: "",
  accessToken: "",
  refreshToken: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobile: (
      state,
      { payload: { mobile } }: PayloadAction<{ mobile: string }>
    ) => {
      state.mobile = mobile;
    },

    setTokens: (
      state,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
    },

    logOut: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("role");

      baseStoreApi.util.invalidateTags(["User"]);
      return initialState;
    },

    setRole: (
      state,
      { payload: { role } }: PayloadAction<{ role: string }>
    ) => {
      state.role = role;

      Cookies.set("role", role);
    },
  },
  extraReducers: (builder) => {},
});

export const { setMobile, setTokens, logOut, setRole } = authSlice.actions;

export default authSlice.reducer;
