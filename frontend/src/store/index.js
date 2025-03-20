import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice";
import homeReducer from "./hompage/homeSlice";
import customerReducer from "./customer/customerSlice";
import ownerReducer from "./owner/ownerSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    home: homeReducer,
    customer:customerReducer, 
    owner: ownerReducer
  },
});

export { store };
