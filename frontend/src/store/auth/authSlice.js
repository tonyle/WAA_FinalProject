import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  error: null,
  role: null,
  allUsers: [],
  success: false
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
      Object.assign(state, initialState);
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
