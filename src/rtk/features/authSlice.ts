import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  isTokenValid: boolean;
}

const initialState: InitialStateType = {
  isTokenValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsTokenValid: (
      state,
      { payload: isTokenValid }: PayloadAction<boolean>
    ) => {
      state.isTokenValid = isTokenValid;
    },
  },
  extraReducers: (builder) => {},
});

export const { setIsTokenValid } = authSlice.actions;

export default authSlice.reducer;
