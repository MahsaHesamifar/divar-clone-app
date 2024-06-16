import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  mobile: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    mobile: "",
    accessToken: "",
    refreshToken: "",
    role: "",
  } as initialStateType,
  reducers: {
    setMobile: (
      state,
      { payload: { mobile } }: PayloadAction<{ mobile: string }>
    ) => {
      state.mobile = mobile;
    },

    setAccessToken: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = accessToken;
    },

    setRefreshToken: (
      state,
      { payload: { refreshToken } }: PayloadAction<{ refreshToken: string }>
    ) => {
      state.refreshToken = refreshToken;
    },

    logOut: (state) => {
      state.mobile = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.role = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { setMobile, setAccessToken, setRefreshToken, logOut } =
  authSlice.actions;

export default authSlice.reducer;
