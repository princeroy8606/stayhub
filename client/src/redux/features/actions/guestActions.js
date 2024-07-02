import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api/api";
import { toast } from "react-toastify";
import { PaymentLaunch } from "../../../utils/ShowPayment";

export const filterdhouses = createAsyncThunk(
  "houses/avialable",
  async (filters) => {
    console.log(filters);
    try {
      const { data } = await api.getHouses(filters);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const checkHome = createAsyncThunk("houses/check", async (roomData) => {
  try {
    const { data } = await api.checkAvailability(roomData);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const WishList = createAsyncThunk("houses/wishlist", async (userId) => {
  try {
    const { data } = await api.likedHouses(userId);
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});
export const updateWishList = createAsyncThunk(
  "houses/wishlist",
  async (newData) => {
    console.log(newData)
    try {
      const { data } = await api.updateWishList(newData);
      data &&
        toast.success(
          `${data?.houseName} is ${
            data?.actionType === "add"
              ? "added to wishList"
              : "removed from wishlist"
          } `
        );
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const newBooking = createAsyncThunk("houses/book", async (bookData) => {
  console.log(bookData);
  try {
    const { data } = await api.bookHouse(bookData);
    if (data) PaymentLaunch(data);
    // if (data.url) window.location.href = data.url;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const bookingPaymentSuccess = createAsyncThunk(
  "houses/payment",
  async (Paymentdata) => {
    console.log(Paymentdata);
    try {
      const { data } = await api.successPaymentRes(Paymentdata);
      if (data.url) window.location.href = data.url;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const bookingHistory = createAsyncThunk(
  "houses/history",
  async (userData) => {
    try {
      const { data } = await api.guestBookingHistory(userData);
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const cancelBookedHouse = createAsyncThunk(
  "houses/cancel",
  async (Id) => {
    console.log(Id);
    try {
      const { data } = await api.cancleBooking(Id);
      data && toast.success("Booking Canceled");

    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const postReview = createAsyncThunk(
  "houses/postReview",
  async (Reviewdata) => {
    try {
      const { data } = await api.addReview(Reviewdata);
      data && toast.success("Review posted");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);
