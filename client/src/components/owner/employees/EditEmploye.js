import React, { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { useAuth } from "../../../context/authContext";
import SelectionList from "../../guest/selectionList";
import { useDispatch, useSelector } from "react-redux";
import {
  Employees,
  removeUser,
  updateEmploye,
} from "../../../redux/features/actions/ownerActions";
import { usePopupWithTimeout } from "../../../hooks/customHook";
import { resetHouseResponse } from "../../../redux/features/slices/ownerSlice";

const EditEmploye = ({ employeDetails, handleCancel }) => {
  const { userData } = useAuth();
  const dispatch = useDispatch();
  const [submitBtn, setsubmitBtn] = useState(false);
  const [employeData, setEmployeData] = useState({
    Name: employeDetails?.name,
    Email: employeDetails?.email,
    Phone: employeDetails?.phone,
    Role: employeDetails?.role,
    AdminId: userData?._id,
    Id: employeDetails?._id,
    UserType: "employee",
  });

  const response = useSelector((state) => state?.ownerReducer?.houseResponse);

  const handleInputChange = (element, e) => {
    setEmployeData((prevData) => ({
      ...prevData,
      [element]: e.target.value,
    }));
  };

  
  useEffect(() => {
    const checkEdit = () => {
      if (
        employeData?.Name !== employeDetails?.name ||
        employeData?.Email !== employeDetails?.email ||
        employeData?.Phone !== employeDetails?.phone ||
        employeData?.Role !== employeDetails?.role
      )
        return setsubmitBtn(true);
      setsubmitBtn(false);
    };
    checkEdit();
  }, [employeData,employeDetails]);

  const handleSubmit = () => {
    dispatch(updateEmploye(employeData));
  };
  usePopupWithTimeout(response === true, () => {
    dispatch(Employees(userData?._id));
    dispatch(resetHouseResponse());
  });
  response && handleCancel();
  const handleDelete = () => {
    dispatch(removeUser({ AdminId: userData?._id, Id: employeDetails?._id }));
  };
  return (
    <div className="popUp-room-edit" style={{ position: "absolute" }}>
      <div className="cancel-btn" onClick={() => handleCancel(false)}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      <div className="block-center-form  block-center-form-edit">
        <h2 style={{ textAlign: "center" }}>Edit Employee</h2>
        <div className="form-cnt">
          <div className="form-input-cnt">
            <h4>Name</h4>
            <input
              type="text"
              className="form-input-box"
              value={employeData?.Name}
              onChange={(e) => handleInputChange("Name", e)}
            />
          </div>
          <div className="form-input-cnt rolen-input-cnt">
            <h4>Role :</h4>
            <SelectionList
              deafultValue={employeDetails?.role}
              data={["Manager", "Staff", "Admin"]}
              onSelect={(e) =>
                setEmployeData((prevdata) => ({
                  ...prevdata,
                  Role: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-input-cnt">
            <h4>Email</h4>
            <input
              type="text"
              name="FloorSize"
              className="form-input-box"
              value={employeData?.Email}
              onChange={(e) => handleInputChange("Email", e)}
            />
          </div>
          <div className="form-input-cnt">
            <h4>Phone</h4>
            <input
              type="number"
              className="form-input-box"
              defaultValue={employeData?.Phone}
              onChange={(e) => handleInputChange("Phone", e)}
            />
          </div>
        </div>
        <div className="edit-employee-btns-cnt">
          <div
            className="submit-btn"
            // onClick={}
            style={{
              backgroundColor: "red",
            }}
            //   onClick={verifiedData ? handleSubmit : null}
            onClick={handleDelete}
          >
            Delete user
          </div>
          <div
            className="submit-btn"
            style={{
              backgroundColor: submitBtn ? "black" : "gray",
            }}
            onClick={submitBtn ? handleSubmit : null}
          >
            Save Changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmploye;
