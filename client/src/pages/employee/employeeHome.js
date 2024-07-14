import React, { useEffect } from "react";
import SiderBar from "../../components/owner/siderBar";
import Dashboard from "../../components/owner/dashboard/Dashboard";
import { getDashboardData } from "../../redux/features/actions/ownerActions";
import { useAuth } from "../../context/authContext";
import { useDispatch } from "react-redux";

const EmployeeHome = () => {
  console.log("renderd");
  const { userData } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("triggered");
    dispatch(getDashboardData(userData?._id));
  }, []);

  return (
    <div className="owner-cont">
      <SiderBar />
      <Dashboard />
    </div>
  );
};

export default EmployeeHome;
