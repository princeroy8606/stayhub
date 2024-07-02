import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getOwnerHouse = createAsyncThunk(
  "owner/houses",
  async (OwnerId) => {
    try {
      const { data } = await api.getOwnersHouse(OwnerId);
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

export const getDashboardData = createAsyncThunk("owner/charts", async (Id) => {
  console.log("dispatched");
  try {
    const { data } = await api.getChartDatas(Id);
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const EarningsData = createAsyncThunk("owner/earnings", async (Id) => {
  try {
    const { data } = await api.getPaymetsData(Id);
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const addNewEmployee = createAsyncThunk(
  "owner/newEmployee",
  async (employeeData) => {
    try {
      const { data } = await api.addEmployee(employeeData);
      data && toast.success("New Employee added successfully");
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

export const Employees = createAsyncThunk(
  "owner/getEmployees",
  async (adminId) => {
    console.log("triggered");
    try {
      const { data } = await api.getEmployees(adminId);
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
export const AllManagers = createAsyncThunk(
  "owner/getManagers",
  async (adminId) => {
    try {
      console.log("running...");
      const { data } = await api.getManagers(adminId);
      console.log(data);
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

export const AllUsers = createAsyncThunk("owner/getUsers", async (adminId) => {
  try {
    const { data } = await api.getUsers(adminId);
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const getBookings = createAsyncThunk(
  "owner/bookings",
  async (OwnerId) => {
    try {
      const { data } = await api.getBookingHistory(OwnerId);
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

export const confirmBooking = createAsyncThunk(
  "houses/confirm",
  async (bookingData) => {
    try {
      const { data } = await api.confrimBooking(bookingData);
      data && toast.success(data?.message);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

export const deleteTheHouse = createAsyncThunk(
  "house/delete",
  async (houseData) => {
    try {
      const { data } = await api.deleteHouse(houseData);
      data?.deleted && toast.success("Accomodation has been Deleted :)");
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

export const newHouse = createAsyncThunk("new", async (houseData) => {
  console.log(houseData);
  try {
    const { data } = await api.addHome(houseData);
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const editHouse = createAsyncThunk("houses/edit", async (changes) => {
  console.log(changes);
  try {
    const { data } = await api.EditHome(changes);
    data && toast.success("Updated SuccesFully");
    return data;
  } catch (error) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

export const updateEmploye = createAsyncThunk(
  "owner/update",
  async (newData) => {
    try {
      const { data } = await api.editEmployee(newData);
      data && toast.success("Employee details updated Successfully");
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

export const removeUser = createAsyncThunk(
  "owner/remove",
  async (employeData) => {
    try {
      const { data } = await api.deleteEmployee(employeData);
      data && toast.success("Employee Removed");
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

export const removeGuest = createAsyncThunk(
  "owner/delete-user",
  async (detailsObj) => {
    try {
      const { data } = await api.deleteGuest(detailsObj);
      data && toast.success("User Removed");
    } catch (err) {
      console.log(err);
    }
  }
);
