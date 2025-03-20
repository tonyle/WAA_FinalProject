import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  properties: [],
  offers: [],
  error: null,
};

export const homepageSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
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
  fetchPropertiesSuccess,
  fetchPropertiesFail,
  fetchOffersSuccess,
  fetchOffersFail,
} = homepageSlice.actions;

export default homepageSlice.reducer;
