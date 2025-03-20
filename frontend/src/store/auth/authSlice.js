import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    "id": 2,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "987-654-3210",
    "status": "ACTIVE",
    "role": "CUSTOMER"
  },
  isAuthenticated: true,
  accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZXMiOiJDVVNUT01FUiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3NDM1MDY5MDcsInVzZXJJZCI6MiwiaWF0IjoxNzQyNDI2OTA3fQ.tDS8Ety0TKUO69d4PyQ6BpXZGcnXRcZTngCUIYxpr8ecfZiDtj4Mi7F-v4xthHws_5SGgGr4BBI-MBmcDmu-cQ",
  refreshToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3NDM1MDY5MDcsImlhdCI6MTc0MjQyNjkwN30.sMwzAEPx-WXJ0vwI3099nu6fz8vFG0I8cqfVCN-ypCdxr6LIBvYqyzeTzzmt25z0FEeZN8vIW-SJowx2m6P59A",
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

      localStorage.setItem("token", JSON.stringify({ ...actions.payload }));
    },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
    },
    signupUser: (state) => {
      state.success = true;
    },
    refreshToken: (state, actions) => {
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
      state.user = actions.payload.user;
    }
  },
});

export const { login, logout, signupUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;
