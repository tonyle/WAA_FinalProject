import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  properties: [],
  offers: [],
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    fetchUsersSuccess: (state, actions) => {
      state.users = actions.payload.data;
      state.error = null;
    },
    fetchUsersFail: (state, actions) => {
      state.users = [];
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
  fetchUsersSuccess,
  fetchUsersFail,
  fetchPropertiesSuccess,
  fetchPropertiesFail,
  fetchOffersSuccess,
  fetchOffersFail,
} = adminSlice.actions;

export default adminSlice.reducer;