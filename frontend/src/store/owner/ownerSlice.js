import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  properties: [],
  propertyDetails: null,
  offers: [],
  error: null,
};

export const ownerSlice = createSlice({
  name: "owner",
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
    fetchPropertyDetailsSuccess: (state, actions) => {
        state.propertyDetails = actions.payload.data;
    }, 
  },
});

export const {
  fetchPropertiesSuccess,
  fetchPropertiesFail,
  fetchOffersSuccess,
  fetchOffersFail,
  fetchPropertyDetailsSuccess
} = ownerSlice.actions;

export default ownerSlice.reducer;
