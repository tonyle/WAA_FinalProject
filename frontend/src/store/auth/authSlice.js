import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRole } from "../../constants/role";

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  error: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      state.user = actions.payload.user;
      state.accessToken = actions.payload.accessToken;
      state.isAuthenticated = true;
      state.role = UserRole.ADMIN;

      localStorage.setItem("token", JSON.stringify({state}));
    },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
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

export const { login, logout } = authSlice.actions;

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
