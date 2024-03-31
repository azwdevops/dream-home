import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
  },
});

export default listingSlice.reducer;

export const { setListings } = listingSlice.actions;
