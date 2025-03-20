import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRole } from "../../constants/role";

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
  role: UserRole.CUSTOMER,
  allUsers: [],
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      const curUser = state.allUsers.find(
        (item) => item.email == actions.payload.user.email
      );
      if (curUser) {
        state.user = curUser;
        state.accessToken = actions.payload.accessToken;
        state.isAuthenticated = true;
        state.role = curUser.role;

        localStorage.setItem("token", JSON.stringify({ state }));
      }
    },
    logout: (state) => {
      const users = state.allUsers;
      Object.assign(state, { ...initialState, allUsers: users });
      localStorage.removeItem("token");
    },
    signupUser: (state, actions) => {
      state.allUsers.push(actions.payload);
      state.success = true;
    },
  },
});

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const data = await loginUser(credentials);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

export const { login, logout, signupUser } = authSlice.actions;

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const newAccessToken = await refreshAccessToken();
      return newAccessToken;
    } catch (error) {
      return rejectWithValue("Failed to refresh token");
    }
  }
);

export default authSlice.reducer;
