import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice";
import customerReducer from "./customer/customerSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    customer:customerReducer
  },
});
