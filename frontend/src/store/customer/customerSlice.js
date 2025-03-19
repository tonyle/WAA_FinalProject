import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offers: [],
    properties: [],
    favorities: [],
    error: null,
}

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    fetchOfferSuccess: (state, actions) => {
      state.offers = actions.payload.data;
      state.error = null;
    },
    fetchOfferFail: (state, actions) => {
      state.offers = [];
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
    fetchFavSuccess: (state, actions) => {
        state.favorities = actions.payload.data;
        state.error = null;
    },
    fetchFavFail: (state, actions) => {
        state.favorities = [];
        state.error = actions.payload.error;
    },
  },
});

export const {fetchOfferSuccess, fetchOfferFail, fetchPropertiesSuccess, fetchPropertiesFail,fetchFavSuccess,fetchFavFail} = customerSlice.actions;
export default customerSlice.reducer;