import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owners: [],
  properties: [],
  customers: [],
  offers: [],
  error: null,
};

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
      state.customers = actions.payload.data;
      state.error = null;
    },
    fetchCustomersFail: (state, actions) => {
      state.customers = [];
      state.error = actions.payload.error;
    },
    fetchOffersSuccess: (state, actions) => {
      state.offers = actions.payload.data;
      state.error = null;
    },
    fetchOffersFail: (state, actions) => {
      state.offers = [];
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
  fetchCustomersFail,
  fetchOffersSuccess,
  fetchOffersFail
} = adminSlice.actions;

export default adminSlice.reducer;