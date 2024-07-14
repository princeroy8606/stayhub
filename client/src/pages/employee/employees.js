import React from "react";
import SiderBar from "../../components/owner/siderBar";
import EmployeeDetails from "../../components/owner/employees/EmployeeDetails";

const Employees = () => {
  return (
    <div className="owner-cont">
      <SiderBar />
      <EmployeeDetails/>
    </div>
  );
};

export default Employees;
