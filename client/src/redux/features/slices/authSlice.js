import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  newPassword,
  otpVerification,
  sendOTPtoMail,
  signUp,
  updateProfile,
} from "../actions/authentication";

const initialState = {
  userData: null,
    mailVerification: null,
    otpVerification: null,
    passwordUpdate: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(sendOTPtoMail.fulfilled, (state, action) => {
      console.log(action?.payload);
      state.mailVerification = action?.payload;
    });

    builder.addCase(otpVerification.fulfilled, (state, action) => {
      state.otpVerification = action?.payload;
    });

    builder.addCase(newPassword.fulfilled, (state, action) => {
      state.passwordUpdate = action?.payload;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.userData = action?.payload;
    });
  },
});

export default authSlice.reducer;
