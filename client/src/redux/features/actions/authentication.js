import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api/api";
import { toast } from "react-toastify";

export const loginAction = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const { data } = await api.login(loginData);
    return data;
  } catch (error) {
   if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
  }
});

export const signUp = createAsyncThunk("auth/signup", async (regData) => {
  console.log(regData)
  try {
    const { data } = await api.signUp(regData);
    return data;
  } catch (error) {
   if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
  }
});

export const sendOTPtoMail = createAsyncThunk(
  "auth/verify/email",
  async (verificationData) => {
    try {
      const { data } = await api.OTP(verificationData);
      data && toast.success("Email verified 👍");
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

export const otpVerification = createAsyncThunk(
  "auth/verify/otp",
  async (OTPData) => {
    try {
      const { data } = await api.OTPCheck(OTPData);
      data && toast.success("OTP verified 🥳");
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

export const newPassword = createAsyncThunk(
  "auth/newpassword",
  async (updationData) => {
    try {
      const { data } = await api.updatePassword(updationData);
      data && toast.success(data?.message);
      return data
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk('auth/updateProfile',async (newData) => {
  console.log(newData)
  try {
    const { data } = await api.updateDetails(newData);
    console.log(data)
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});
