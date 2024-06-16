import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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

    logOut: (state) => {
      state.mobile = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.role = "";
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {},
});

export const { setMobile, setTokens, logOut } = authSlice.actions;

export default authSlice.reducer;
