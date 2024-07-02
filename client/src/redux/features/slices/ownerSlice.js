import { createSlice } from "@reduxjs/toolkit";
import {
  AllManagers,
  AllUsers,
  EarningsData,
  Employees,
  addNewEmployee,
  deleteTheHouse,
  deleteThisRoom,
  editHouse,
  editRoom,
  getBookings,
  getDashboardData,
  getOwnerHouse,
  newHouse,
  newRoom,
  removeUser,
  reset,
  updateEmploye,
} from "../actions/ownerActions";

const initialState = {
  houses: null,
  bookings: null,
  deletedRoom: null,
  houseResponse: null,
  employeeList: null,
  chartDatas: null,
  EarningsData: null,
  managersList: null,
  usersList: null,
};

export const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    resetHouseResponse: (state) => {
      state.houseResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.chartDatas = action.payload;
    });

    builder.addCase(EarningsData.fulfilled, (state, action) => {
      state.EarningsData = action.payload;
    });

    builder.addCase(getOwnerHouse.fulfilled, (state, action) => {
      state.houses = action.payload;
    });

    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
    });

    builder.addCase(deleteTheHouse.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });

    builder.addCase(newHouse.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });

    builder.addCase(editHouse.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });

    builder.addCase(addNewEmployee.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });

    builder.addCase(Employees.fulfilled, (state, action) => {
      state.employeeList = action.payload;
    });

    builder.addCase(AllManagers.fulfilled, (state, action) => {
      state.managersList = action.payload;
    });

    builder.addCase(AllUsers.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });

    builder.addCase(updateEmploye.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.houseResponse = action.payload;
    });
  },
});

export const { resetHouseResponse } = ownerSlice.actions;

export default ownerSlice.reducer;
