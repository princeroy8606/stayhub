import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPropertys from "../../../pages/employee/myPropertys";
import Bookings from "../../../pages/employee/bookings";
import Earnings from "../../../pages/employee/earnings";
import Employees from "../../../pages/employee/employees";
import EmployeeHome from "../../../pages/employee/employeeHome";
import EditAccomodation from "../../../components/owner/propertys/editAccomodation/EditAccomodation";
import Managers from "../../../pages/employee/Managers";
import Users from "../../../pages/employee/Users";
import Profile from "../../../pages/guest/profile";

const OwnerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeHome />} />
      <Route path="/propertys" element={<MyPropertys />} />
      <Route path="/propertys/edit-room" element={<EditAccomodation />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/users" element={<Users />} />
      <Route path="/managers" element={<Managers />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default OwnerRoutes;
