import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setLogin, clearAuthState } = authSlice.actions;
