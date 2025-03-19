import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer
  },
});
