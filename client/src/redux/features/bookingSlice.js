import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [],
  wishList: [],
  reservations: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action?.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action?.payload;
    },
    setReservations: (state, action) => {
      state.reservations = action?.payload;
    },
    clearBookingState: (state) => {
      state.trips = [];
      state.wishList = [];
      state.reservations = [];
    },
  },
});

export default bookingSlice.reducer;

export const { setTrips, setWishList, setReservations, clearBookingState } =
  bookingSlice.actions;
