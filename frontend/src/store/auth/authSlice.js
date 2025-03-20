import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: true,
  accessToken: null,
  refreshToken: null,
  error: null,
  role: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload.user;
      state.isAuthenticated = true;
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
      state.role = actions.payload.user.role;

      localStorage.setItem("token", JSON.stringify(actions.payload));
    },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
    },
    signupUser: (state) => {
      state.success = true;
    },
    refreshToken: (state, actions) => {

    }
  },
});

export const { login, logout, signupUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;
