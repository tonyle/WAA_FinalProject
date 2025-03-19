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
      state.user = {
        id: actions.payload.id,
        name: actions.payload.name,
        email: actions.payload.email,
        phone: actions.payload.phone,
        status: actions.payload.status,
        role: actions.payload.role
      };
      state.isAuthenticated = true;
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
      state.role = actions.payload.role;

      localStorage.setItem("token", JSON.stringify(actions.payload));
    },
    logout: (state) => {
      Object.assign(state, { ...initialState, allUsers: users });
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
