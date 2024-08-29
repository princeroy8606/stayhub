import { createSlice } from "@reduxjs/toolkit";
import {
  WishList,
  bookingHistory,
  // cancelBookedHouse,
  checkHome,
  // checkRoom,
  // filterdRooms,
  filterdhouses,
  newBooking,
} from "../actions/guestActions";

const initialState = {
  houses: null,
  response: null,
  bookingHistory: null,
  payemntResponse: null,
  wishList: null,
};

export const guestSlice = createSlice({
  name: "houses",
  reducers: {
    resetResponse: (state) => {
      state.response = null;
    },
    resetBookingResponse: (state) => {
      state.bookingResponse = null;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(filterdhouses.fulfilled, (state, action) => {
      state.houses = action.payload;
    });

    builder.addCase(checkHome.fulfilled, (state, action) => {
      state.response = action.payload;
    });

    builder.addCase(bookingHistory.fulfilled, (state, action) => {
      state.bookingHistory = action.payload;
    });
    builder.addCase(newBooking.fulfilled, (state, action) => {
      state.payemntResponse = false;
    });
    builder.addCase(WishList.fulfilled, (state, action) => {
      state.wishList = action.payload;
    });
    // builder.addCase(cancelBookedHouse.fulfilled, (state, action) => {
    //   state.bookingHistory = action.payload;
    // });
  },
});

export const { resetResponse, resetBookingResponse } = guestSlice.actions;

export default guestSlice.reducer;
