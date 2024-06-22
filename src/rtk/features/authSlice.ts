import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface InitialStateType {
  mobile: string;
  role: string;
  isTokenValid: boolean;
}

const initialState: InitialStateType = {
  mobile: "",
  role: "",
  isTokenValid: false,
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
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
    },

    logOut: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("role");

      return initialState;
    },

    setRole: (
      state,
      { payload: { role } }: PayloadAction<{ role: string }>
    ) => {
      state.role = role;

      Cookies.set("role", role);
    },

    setIsTokenValid: (
      state,
      { payload: isTokenValid }: PayloadAction<boolean>
    ) => {
      state.isTokenValid = isTokenValid;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMobile, setTokens, logOut, setRole, setIsTokenValid } =
  authSlice.actions;

export default authSlice.reducer;
