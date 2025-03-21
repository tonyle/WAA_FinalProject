import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  property: null,
  error: null,
  loading: false,
};

export const propertySlice = createSlice({
  name: "property",
  initialState: initialState,
  reducers: {
    addPropertySuccess: (state, actions) => {
      state.loading = false;
      state.property = actions.payload.data;
    },
  },
});

export const { addPropertySuccess } = propertySlice.actions;

export default propertySlice.reducer;
