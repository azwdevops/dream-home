import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  myProperties: [],
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setMyProperties: (state, action) => {
      state.myProperties = action?.payload;
    },
    clearListingState: (state) => {
      state.myProperties = [];
      // we won't clear listings since they are not attached to a user
    },
  },
});

export default listingSlice.reducer;

export const { setListings, setMyProperties, clearListingState } =
  listingSlice.actions;
