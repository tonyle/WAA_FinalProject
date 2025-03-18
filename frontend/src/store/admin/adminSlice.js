import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    owners: [],
    properties: [],
    customers: [],
    error: null,
}

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    fetchOwnersSuccess: (state, actions) => {
      state.owners = actions.payload.data;
      state.error = null;
    },
    fetchOwnersFail: (state, actions) => {
      state.owners = [];
      state.error = actions.payload.error;
    },
    fetchPropertiesSuccess: (state, actions) => {
      state.properties = actions.payload.data;
      state.error = null;
    },
    fetchPropertiesFail: (state, actions) => {
      state.properties = [];
      state.error = actions.payload.error;
    },
    fetchCustomersSuccess: (state, actions) => {
      state.properties = actions.payload.data;
      state.error = null;
    },
    fetchCustomersFail: (state, actions) => {
      state.properties = [];
      state.error = actions.payload.error;
    },
  },
});

export const {
  fetchOwnersSuccess,
  fetchOwnersFail,
  fetchPropertiesSuccess,
  fetchPropertiesFail,
  fetchCustomersSuccess,
  fetchCustomersFail
} = adminSlice.actions;

export default adminSlice.reducer;