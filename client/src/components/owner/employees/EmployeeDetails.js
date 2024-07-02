import React, { useEffect, useState } from "react";
import EditRoom from "./newEmployee";
import NewEmployee from "./newEmployee";
import { useDispatch, useSelector } from "react-redux";
import { Employees } from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import EditEmploye from "./EditEmploye";
import { Skeleton } from "@mui/material";

const EmployeeDetails = () => {
  const { userData } = useAuth();
  const [showAddArea, setShowAddArea] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const EmployeeList = useSelector(
    (state) => state?.ownerReducer?.employeeList
  );

  const dispatch = useDispatch();
  const handleDispatch = () => {
    if (!EmployeeList) {
      return dispatch(Employees(userData?._id));
    }
  };
  useEffect(() => {
    handleDispatch();
  }, [EmployeeList]);

  const toggleEdit = (data) => {
    setEditEmployee(true);
    setEmployeeData(data);
  };


    
  const skeletonElements = [];
  for (let i = 0; i < 7; i++) {
    if (!EmployeeList) {
      skeletonElements.push(
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          variant="rounded"
          width={'100%'} 
          height={'3rem'}
          style={{marginBottom:20}}
          animation="wave"
          key={i}
        />
      );
    }
  }
  return (
    <div className="dashboard-cnt">
      {showAddArea ? (
        <NewEmployee handleCancel={() => setShowAddArea(false)} />
      ) : null}
      {editEmployee && (
        <EditEmploye
          employeDetails={employeeData}
          handleCancel={() => setEditEmployee(false)}
        />
      )}
      <div className="dashboard-top">
        <h2 className="dashboard-head-text">Employees</h2>
        <div
            className="add-Button employee-btn"
            onClick={() => setShowAddArea(true)}
          >
            Add New Employee
          </div>
      </div>
      <div className="property-list-cnt">
        <div className="booked-card-cnt" style={{backgroundColor:"#DEDEDC"}}>
          <h3 className="employe-row-value" style={{color:"black"}}>Name</h3>
          <h3 className="employe-row-value" style={{color:"black"}}>Email</h3>
          <h3 className="employe-row-value" style={{color:"black"}}>Phone</h3>
          <h3 className="employe-row-value small-value" style={{color:"black"}}>Role</h3>
          <h3 className="employe-row-value small-value" style={{color:"black"}}>Edit</h3>
        </div>
        {!editEmployee &&
          !showAddArea &&
          EmployeeList?.map((employee) => (
            <div className="booked-card-cnt" key={employee?.phone} >
              <div className="employe-row-value" >{employee.name}</div>
              <div className="employe-row-value" >{employee.email}</div>
              <div className="employe-row-value" >{employee.phone}</div>
              <div className="employe-row-value small-value" >
                <div className="role" >{employee.role}</div>
              </div>
              <div className="employe-row-value small-value">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="black"
                  className="employee-edit-btn"
                  onClick={() => toggleEdit(employee)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
            </div>
          ))} 
          {
            skeletonElements
          }
      </div>
    </div>
  );
};

export default EmployeeDetails;
